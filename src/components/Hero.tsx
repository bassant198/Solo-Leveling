import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Compass } from 'lucide-react';
import { ManaParticleCanvas } from './ManaParticleCanvas';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onEnterSystem: () => void;
  onExploreShadows: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterSystem, onExploreShadows }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const characterBreathRef = useRef<HTMLDivElement | null>(null);
  const backlightRef = useRef<HTMLDivElement | null>(null);
  const ariseTextRef = useRef<HTMLHeadingElement | null>(null);
  const monarchTextRef = useRef<HTMLSpanElement | null>(null);
  const systemUIRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const darkOverlayRef = useRef<HTMLDivElement | null>(null);
  const fogRef = useRef<HTMLDivElement | null>(null);

  // Magnetic button refs
  const btnEnterRef = useRef<HTMLButtonElement | null>(null);
  const btnExploreRef = useRef<HTMLButtonElement | null>(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [dataFlicker, setDataFlicker] = useState(false);

  // Check touch and reduced motion
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Mouse Parallax Handler (desktop only)
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const updateParallax = () => {
      // Smooth lerp for buttery cinematic feel
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMouseOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice, prefersReducedMotion]);

  // 2. Character Idle Breathing & Light Pulse Animation (GSAP)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle character idle breathing
      if (characterBreathRef.current) {
        gsap.to(characterBreathRef.current, {
          y: -7,
          scale: 1.012,
          duration: 3.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // Soft back light pulsing
      if (backlightRef.current) {
        gsap.to(backlightRef.current, {
          scale: 1.08,
          opacity: 0.55,
          duration: 4.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // Entrance animation for ARISE text: blur -> sharp, scale -> 1, opacity -> 1
      if (ariseTextRef.current) {
        gsap.fromTo(
          ariseTextRef.current,
          {
            opacity: 0,
            scale: 1.12,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            delay: 0.2,
            ease: 'power3.out',
          }
        );
      }

      // Staggered reveal for THE SHADOW MONARCH words
      const words = containerRef.current?.querySelectorAll('.monarch-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 16,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.12,
            delay: 0.6,
            ease: 'power2.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 3. ScrollTrigger Pinned Cinematic Scroll Transition
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Early fade for scroll indicator
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        );
      }

      // ARISE scales down slightly and fades
      if (ariseTextRef.current) {
        tl.to(
          ariseTextRef.current,
          {
            scale: 0.86,
            y: -30,
            opacity: 0.15,
            filter: 'blur(6px)',
            duration: 0.8,
            ease: 'power2.inOut',
          },
          0.1
        );
      }

      // Character moves upward and slightly backward
      if (characterRef.current) {
        tl.to(
          characterRef.current,
          {
            y: -65,
            scale: 0.93,
            opacity: 0.4,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          0.1
        );
      }

      // Background darkens
      if (darkOverlayRef.current) {
        tl.to(
          darkOverlayRef.current,
          {
            opacity: 0.8,
            duration: 0.9,
            ease: 'power1.inOut',
          },
          0.1
        );
      }

      // Fog density increases
      if (fogRef.current) {
        tl.to(
          fogRef.current,
          {
            opacity: 0.85,
            duration: 0.8,
            ease: 'power1.inOut',
          },
          0.2
        );
      }

      // System UI fades out cleanly
      if (systemUIRef.current) {
        tl.to(
          systemUIRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.1
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 4. Subtle System UI telemetry flicker timer
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setDataFlicker(true);
      setTimeout(() => setDataFlicker(false), 120);
    }, 4200);

    return () => clearInterval(flickerInterval);
  }, []);

  // 5. Magnetic Button Hover Interaction
  const handleButtonMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    btnRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    if (isTouchDevice || prefersReducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    btnRef.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0) scale(1.03)`;
  };

  const handleButtonMouseLeave = (btnRef: React.RefObject<HTMLButtonElement | null>) => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#03040A] select-none"
    >
      {/* ========================================================
          LAYER 1: Background Atmosphere (Deep cosmic void)
      ======================================================== */}
      <div className="absolute inset-0 bg-[#03040A] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(17,24,43,0.92)_0%,#03040A_82%)]" />
      </div>

      {/* ========================================================
          LAYER 2: Architectural Environment (Monolith temple texture)
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-screen transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url('/src/assets/images/system_hologram_core_1790458737018.jpg')`,
          transform: `scale(1.06) translate3d(${mouseOffset.x * -6}px, ${mouseOffset.y * -6}px, 0)`,
        }}
      />

      {/* ========================================================
          LAYER 3: Ethereal Fog / Mist Drift
      ======================================================== */}
      <div ref={fogRef} className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500">
        <div className="absolute -bottom-24 inset-x-0 h-96 bg-gradient-to-t from-[#03040A] via-[#070B14]/85 to-transparent z-20" />

        {/* Floating horizontal mist bands */}
        <div className="absolute top-1/3 -left-20 w-[120%] h-48 bg-gradient-to-r from-transparent via-[#5B4BFF]/8 to-transparent blur-3xl animate-fog-left pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-[120%] h-56 bg-gradient-to-l from-transparent via-[#39A7FF]/8 to-transparent blur-3xl animate-fog-right pointer-events-none" />
      </div>

      {/* ========================================================
          LAYER 4: Shadow Particles (Ambient Mana Canvas)
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0)`,
        }}
      >
        <ManaParticleCanvas layer="ambient" className="opacity-60" />
      </div>

      {/* ========================================================
          LAYER 5: Character Layer & Dynamic Back Lighting
      ======================================================== */}
      <div
        ref={characterRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 14}px, ${mouseOffset.y * 14}px, 0)`,
        }}
      >
        {/* Animated Backlight Source behind Character */}
        <div
          ref={backlightRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#5B4BFF]/25 via-[#39A7FF]/20 to-transparent blur-[110px] pointer-events-none"
        />

        {/* Character with Idle Breathing Timeline */}
        <div
          ref={characterBreathRef}
          className="relative w-full max-w-4xl h-[76vh] sm:h-[84vh] flex items-center justify-center"
        >
          <img
            src="/src/assets/images/hero_shadow_monarch_1790458690790.jpg"
            alt="Sung Jin-Woo Shadow Monarch"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-bottom opacity-90 drop-shadow-[0_20px_50px_rgba(3,4,10,0.95)]"
            style={{
              maskImage: 'radial-gradient(ellipse at 50% 55%, black 48%, transparent 82%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 48%, transparent 82%)',
            }}
          />
        </div>
      </div>

      {/* ========================================================
          LAYER 6: Foreground Reacting Particles
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * 24}px, 0)`,
        }}
      >
        <ManaParticleCanvas layer="foreground" className="opacity-80" />
      </div>

      {/* ========================================================
          LAYER 7: System UI Overlays & Living Telemetry
      ======================================================== */}
      <div
        ref={systemUIRef}
        className="absolute inset-x-8 top-24 bottom-12 pointer-events-none hidden md:flex flex-col justify-between z-20 text-[11px] font-mono-tech tracking-widest text-[#B8C7FF]/40 transition-opacity duration-300"
      >
        {/* Top telemetry brackets */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 border-l border-[#5B4BFF]/40 pl-3">
            <span className="text-[#39A7FF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39A7FF] animate-ping" />
              <span>QUEST PROTOCOL: AWAKENED</span>
            </span>
            <span className={dataFlicker ? 'opacity-40 text-white' : 'opacity-80'}>
              VESSEL: SUNG JIN-WOO
            </span>
            <span>RANK: S-RANK OVERFLOW [99,999+]</span>
          </div>

          <div className="flex flex-col gap-1 border-r border-[#5B4BFF]/40 pr-3 text-right">
            <span>DOMAIN: MONARCH REALM</span>
            <span className={`text-[#39A7FF] transition-opacity ${dataFlicker ? 'opacity-40' : 'opacity-100'}`}>
              MANA CORE: 100.0% STABLE
            </span>
            <span className="text-white/60">STATE: TRANSCENDENT</span>
          </div>
        </div>

        {/* Bottom system status coordinates */}
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#39A7FF] shadow-[0_0_8px_#39A7FF]" />
            <span className="text-white/70 tracking-widest">
              SYS_AUTH://SOLO_LEVELING_ONLINE
            </span>
          </div>
          <div className="tracking-[0.3em] text-[#B8C7FF]/50 flex items-center gap-2">
            <span>LOC://DOUBLE_DUNGEON_REBIRTH</span>
            <span className="text-emerald-400">●</span>
          </div>
        </div>
      </div>

      {/* Dark overlay for scroll transition */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 bg-[#03040A] opacity-0 pointer-events-none z-25"
      />

      {/* ========================================================
          LAYER 8 & 9: Typography & Magnetic Action Buttons
      ======================================================== */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-4xl pt-16">
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded bg-[#0B1020]/80 border border-[#1A1F38] text-[11px] font-mono-tech text-[#39A7FF] tracking-[0.3em] uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39A7FF] shadow-[0_0_8px_#39A7FF]" />
          <span>THE ABSOLUTE SOVEREIGN</span>
        </div>

        {/* Main Dramatic Typographic Statement */}
        <h1 className="flex flex-col items-center">
          <span className="font-mono-tech text-xs sm:text-sm tracking-[0.6em] text-[#B8C7FF]/70 uppercase font-semibold mb-1">
            SYSTEM
          </span>

          {/* Cinematic ARISE with entrance blur/scale & text shine sweep */}
          <span
            ref={ariseTextRef}
            className="font-cinzel text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F7FF] via-[#39A7FF]/70 to-white drop-shadow-[0_0_40px_rgba(91,75,255,0.45)] my-1 animate-text-shine"
          >
            ARISE.
          </span>

          {/* Staggered THE SHADOW MONARCH Reveal */}
          <span
            ref={monarchTextRef}
            className="font-cinzel text-sm sm:text-xl md:text-2xl font-semibold tracking-[0.4em] text-[#39A7FF] uppercase mt-2 flex gap-3 flex-wrap justify-center"
          >
            <span className="monarch-word inline-block">THE</span>
            <span className="monarch-word inline-block">SHADOW</span>
            <span className="monarch-word inline-block">MONARCH</span>
          </span>
        </h1>

        {/* Supporting Quote */}
        <p className="mt-5 text-sm sm:text-base text-[#B8C7FF]/75 max-w-md font-normal leading-relaxed tracking-wide italic">
          &ldquo;Power is not given. It is awakened.&rdquo;
        </p>

        {/* High-Intent Single-Line Action CTAs with Magnetic Hover */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Button 1: ENTER THE SYSTEM */}
          <button
            ref={btnEnterRef}
            onClick={() => {
              sound.playSystemPing();
              onEnterSystem();
            }}
            onMouseMove={(e) => handleButtonMouseMove(e, btnEnterRef)}
            onMouseLeave={() => handleButtonMouseLeave(btnEnterRef)}
            data-cursor-special="true"
            className="group relative w-full sm:w-auto px-8 py-3.5 text-xs font-mono-tech uppercase tracking-[0.25em] text-white bg-gradient-to-r from-[#5B4BFF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#39A7FF] rounded-md transition-shadow duration-300 shadow-[0_0_25px_rgba(91,75,255,0.35)] hover:shadow-[0_0_35px_rgba(57,167,255,0.6)] active:scale-95 whitespace-nowrap overflow-hidden border border-[#5B4BFF]/60"
            style={{ transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
              <Sparkles className="w-4 h-4 text-[#F4F7FF] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
              <span>ENTER THE SYSTEM</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* Button 2: EXPLORE THE SHADOWS */}
          <button
            ref={btnExploreRef}
            onClick={() => {
              sound.playAriseSurge();
              onExploreShadows();
            }}
            onMouseMove={(e) => handleButtonMouseMove(e, btnExploreRef)}
            onMouseLeave={() => handleButtonMouseLeave(btnExploreRef)}
            data-cursor-arise="true"
            className="group relative w-full sm:w-auto px-8 py-3.5 text-xs font-mono-tech uppercase tracking-[0.25em] text-[#B8C7FF] hover:text-white bg-[#0B1020]/90 hover:bg-[#11182B] border border-[#1A1F38] hover:border-[#5B4BFF] rounded-md transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(91,75,255,0.25)] active:scale-95 whitespace-nowrap"
            style={{ transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease' }}
          >
            <span className="flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-[#39A7FF] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
              <span>EXPLORE THE SHADOWS</span>
            </span>
          </button>
        </div>

        {/* Scroll Indicator: gently moves vertically and fades on scroll */}
        <div
          ref={scrollIndicatorRef}
          className="mt-14 flex flex-col items-center gap-2 opacity-65 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-mono-tech tracking-[0.3em] uppercase text-[#B8C7FF]">
            SCROLL TO COMMENCE
          </span>
          <ChevronDown className="w-4 h-4 text-[#39A7FF] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
