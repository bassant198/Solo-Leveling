import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

interface ManaParticleCanvasProps {
  layer?: 'ambient' | 'foreground';
  className?: string;
}

export const ManaParticleCanvas: React.FC<ManaParticleCanvasProps> = ({
  layer = 'ambient',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    const isForeground = layer === 'foreground';
    const isMobile = window.innerWidth < 768;
    const particleCount = isForeground ? (isMobile ? 12 : 24) : (isMobile ? 25 : 50);
    const particles: Particle[] = [];
    const colors = isForeground
      ? ['#39A7FF', '#F4F7FF', '#6C63FF', '#B8C7FF']
      : ['#39A7FF', '#5B4BFF', '#1A1F38', '#6C63FF'];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = isForeground ? Math.random() * 0.4 + 0.3 : Math.random() * 0.25 + 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isForeground ? 0.5 : 0.25),
        vy: -Math.random() * (isForeground ? 0.7 : 0.4) - 0.1,
        size: isForeground ? Math.random() * 2.2 + 1.2 : Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // subtle wave
        p.x += Math.sin(tick * 0.02 + i) * (isForeground ? 0.35 : 0.15);

        // wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // mouse proximity glow
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = isForeground ? 220 : 140;
        const mouseFactor = dist < radius ? (1 - dist / radius) * (isForeground ? 0.6 : 0.3) : 0;

        p.alpha = p.baseAlpha + Math.sin(tick * p.pulseSpeed) * 0.1 + mouseFactor;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = isForeground ? 16 : 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [layer]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

