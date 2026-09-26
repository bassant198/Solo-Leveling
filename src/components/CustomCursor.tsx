import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isSpecialHover, setIsSpecialHover] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('button, a, input, [data-interactive="true"]');
        const specialEl = target.closest('[data-cursor-arise="true"], [data-cursor-special="true"]');

        setIsHovering(!!interactiveEl);
        setIsSpecialHover(!!specialEl);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      setTrailPos((prev) => ({
        x: lerp(prev.x, pos.x, 0.2),
        y: lerp(prev.y, pos.y, 0.2),
      }));
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central sharp dot */}
      <div
        className={`fixed top-0 left-0 rounded-full transition-transform duration-75 ease-out ${
          isSpecialHover
            ? 'w-3 h-3 bg-[#39A7FF] shadow-[0_0_15px_#39A7FF]'
            : isHovering
            ? 'w-2.5 h-2.5 bg-[#5B4BFF] shadow-[0_0_10px_#5B4BFF]'
            : 'w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
        }`}
        style={{
          transform: `translate3d(${pos.x - (isSpecialHover ? 6 : isHovering ? 5 : 3)}px, ${
            pos.y - (isSpecialHover ? 6 : isHovering ? 5 : 3)
          }px, 0) scale(${isMouseDown ? 0.7 : 1})`,
        }}
      />

      {/* Outer fluid aura ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out ${
          isSpecialHover
            ? 'w-14 h-14 border-[#39A7FF] bg-[#5B4BFF]/15 shadow-[0_0_30px_rgba(57,167,255,0.4)] animate-pulse'
            : isHovering
            ? 'w-10 h-10 border-[#5B4BFF]/80 bg-[#5B4BFF]/10 shadow-[0_0_20px_rgba(91,75,255,0.25)]'
            : 'w-7 h-7 border-white/25 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailPos.x - (isSpecialHover ? 28 : isHovering ? 20 : 14)}px, ${
            trailPos.y - (isSpecialHover ? 28 : isHovering ? 20 : 14)
          }px, 0) scale(${isMouseDown ? 0.85 : 1})`,
        }}
      />
    </div>
  );
};
