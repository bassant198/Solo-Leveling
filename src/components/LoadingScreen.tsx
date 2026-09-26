import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initializing' | 'core' | 'online' | 'exit'>('initializing');
  const completedRef = useRef(false);

  const safeComplete = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  };

  useEffect(() => {
    // Hard failsafe: if still active after 4.5s, force exit
    const hardFailsafe = setTimeout(() => {
      setPhase('exit');
      setTimeout(safeComplete, 300);
    }, 4500);

    // Increment progress reliably to 100% in ~1.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        return next >= 100 ? 100 : next;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      clearTimeout(hardFailsafe);
    };
  }, []);

  // Update phases based on progress
  useEffect(() => {
    if (progress >= 40 && phase === 'initializing') {
      setPhase('core');
      try {
        sound.playSystemPing();
      } catch {
        // Safe audio fallback
      }
    } else if (progress >= 100 && (phase === 'core' || phase === 'initializing')) {
      setPhase('online');
      try {
        sound.playSystemPing();
      } catch {
        // Safe audio fallback
      }

      // Progress reaches 100% -> wait 800ms -> exit animation -> loading state becomes false
      const exitTimer = setTimeout(() => {
        setPhase('exit');
        try {
          sound.playAriseSurge();
        } catch {
          // Safe audio fallback
        }

        const finishTimer = setTimeout(() => {
          safeComplete();
        }, 500);

        return () => clearTimeout(finishTimer);
      }, 800);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, phase]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03040A] text-white transition-all duration-500 ease-out select-none ${
        phase === 'exit' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      {/* Holographic background scan lines */}
      <div className="absolute inset-0 system-scanline pointer-events-none opacity-40" />

      {/* Subtle vignette and glowing core backdrop */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#5B4BFF]/10 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Geometric System Crest */}
        <div className="mb-8 relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border border-[#5B4BFF]/40 rotate-45 animate-spin" style={{ animationDuration: '18s' }} />
          <div className="absolute inset-2 border border-[#39A7FF]/30 -rotate-45 animate-spin" style={{ animationDuration: '12s' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#39A7FF] shadow-[0_0_12px_#39A7FF]" />
        </div>

        {/* Text Stages */}
        <div className="h-16 flex flex-col items-center justify-center">
          {phase === 'initializing' && (
            <p className="font-mono-tech text-xs tracking-[0.3em] text-[#B8C7FF] uppercase animate-pulse">
              SYSTEM INITIALIZING...
            </p>
          )}

          {phase === 'core' && (
            <p className="font-mono-tech text-xs tracking-[0.3em] text-[#39A7FF] uppercase animate-pulse">
              LOADING SHADOW CORE...
            </p>
          )}

          {phase === 'online' && (
            <div className="font-mono-tech text-sm tracking-[0.35em] text-[#39A7FF] font-semibold uppercase animate-pulse">
              [ SYSTEM ONLINE ]
            </div>
          )}

          {phase === 'exit' && (
            <div className="font-cinzel text-4xl sm:text-5xl tracking-[0.25em] text-white font-extrabold drop-shadow-[0_0_25px_rgba(91,75,255,0.8)]">
              ARISE.
            </div>
          )}
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full mt-6 flex flex-col items-center gap-2">
          <div className="w-64 h-[2px] bg-[#11182B] overflow-hidden rounded-full relative">
            <div
              className="h-full bg-gradient-to-r from-[#5B4BFF] via-[#39A7FF] to-white transition-all duration-75 ease-out shadow-[0_0_10px_#39A7FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between w-64 text-[10px] font-mono-tech text-[#B8C7FF]/60 tracking-wider">
            <span>INITIALIZE</span>
            <span className="tabular-nums text-[#39A7FF]">{progress}%</span>
          </div>
        </div>

        {/* System Coordinates Kicker */}
        <div className="mt-12 text-[10px] font-mono-tech text-white/30 tracking-widest flex items-center gap-2">
          <span>PORTAL: SOL-770</span>
          <span>·</span>
          <span>AUTH: PLAYER_SJW</span>
        </div>
      </div>

      {/* Cinematic Mask Out effect curtains */}
      <div
        className={`absolute inset-x-0 top-0 bg-[#03040A] transition-all duration-500 ease-in-out pointer-events-none ${
          phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ height: '50%' }}
      />
      <div
        className={`absolute inset-x-0 bottom-0 bg-[#03040A] transition-all duration-500 ease-in-out pointer-events-none ${
          phase === 'exit' ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ height: '50%' }}
      />
    </div>
  );
};

