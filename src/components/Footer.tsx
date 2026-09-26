import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playSystemPing();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03040A] text-white pt-24 pb-16 px-6 border-t border-[#11182B] overflow-hidden">
      {/* Slow ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5B4BFF]/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* System Offline Kicker */}
        <div className="font-mono-tech text-xs tracking-[0.4em] text-[#B8C7FF]/40 uppercase mb-4">
          [ SYSTEM OFFLINE ]
        </div>

        {/* Monumental Arise */}
        <div
          onClick={() => {
            sound.playAriseSurge();
          }}
          data-cursor-arise="true"
          className="font-cinzel text-5xl sm:text-7xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#B8C7FF] to-[#39A7FF]/30 hover:to-[#39A7FF] transition-all cursor-pointer select-none my-2"
        >
          ARISE.
        </div>

        <p className="mt-4 text-xs font-mono-tech text-[#B8C7FF]/60 max-w-md italic">
          &ldquo;I will protect my family and slaughter anyone who stands in my path.&rdquo;
        </p>

        {/* Minimal Navigation Mirrors */}
        <div className="flex flex-wrap items-center justify-center gap-6 my-10 text-xs font-mono-tech uppercase tracking-widest text-[#B8C7FF]/60">
          <a href="#status" className="hover:text-white transition-colors">
            Player Status
          </a>
          <span>·</span>
          <a href="#characters" className="hover:text-white transition-colors">
            Hunter Database
          </a>
          <span>·</span>
          <a href="#shadow-army" className="hover:text-white transition-colors">
            Shadow Legion
          </a>
          <span>·</span>
          <a href="#gates" className="hover:text-white transition-colors">
            Dungeon Gates
          </a>
          <span>·</span>
          <a href="#daily-quest" className="hover:text-white transition-colors">
            Daily Quests
          </a>
          <span>·</span>
          <a href="#hunter-profile" className="hover:text-white transition-colors">
            Hunter Awakening
          </a>
        </div>

        {/* Scroll back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-[#0B1020] hover:bg-[#11182B] border border-[#1A1F38] hover:border-[#39A7FF] text-[#B8C7FF] hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(57,167,255,0.3)] mb-10 active:scale-95"
          title="Return to System Apex"
        >
          <ArrowUp className="w-4 h-4 text-[#39A7FF]" />
        </button>

        {/* Quiet Legal & Tribute Attribution */}
        <div className="text-[11px] font-mono-tech text-white/30 tracking-wider space-y-1">
          <p>
            An interactive tribute to <span className="text-white/60">Solo Leveling (나 혼자만 레벨업)</span> by Chugong & DUBU (REDICE STUDIO).
          </p>
          <p>© 2026 THE SHADOW MONARCH SYSTEM · ALL PROTOCOLS RESTORED</p>
        </div>
      </div>
    </footer>
  );
};
