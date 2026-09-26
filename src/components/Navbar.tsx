import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Sparkles, Database } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onAriseClick: () => void;
  onOpenArchive: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAriseClick, onOpenArchive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const nextState = !audioActive;
    sound.enabled = nextState;
    setAudioActive(nextState);
    if (nextState) {
      sound.playSystemPing();
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#03040A]/90 backdrop-blur-md border-b border-[#1A1F38]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.25em] text-white hover:text-[#39A7FF] transition-colors whitespace-nowrap"
        >
          THE SYSTEM
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono-tech uppercase tracking-[0.2em] text-[#B8C7FF]/70">
          <a
            href="#status"
            className="hover:text-white transition-colors relative py-1 hover:border-b hover:border-[#39A7FF]"
          >
            Status
          </a>
          <a
            href="#characters"
            className="hover:text-white transition-colors relative py-1 hover:border-b hover:border-[#39A7FF]"
          >
            Characters
          </a>
          <a
            href="#shadow-army"
            className="hover:text-white transition-colors relative py-1 hover:border-b hover:border-[#39A7FF]"
          >
            Shadow Army
          </a>
          <a
            href="#gates"
            className="hover:text-white transition-colors relative py-1 hover:border-b hover:border-[#39A7FF]"
          >
            Gates
          </a>
          <a
            href="#daily-quest"
            className="hover:text-white transition-colors relative py-1 hover:border-b hover:border-[#39A7FF]"
          >
            Daily Quest
          </a>
          <a
            href="#hunter-profile"
            className="hover:text-white transition-colors relative py-1 hover:border-b hover:border-[#39A7FF]"
          >
            Awakening
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playSystemPing();
              onOpenArchive();
            }}
            title="Open System Archive Database"
            className="px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider text-[#39A7FF] hover:text-white bg-[#0B1020]/90 hover:bg-[#11182B] border border-[#39A7FF]/40 hover:border-[#39A7FF] rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Database className="w-3.5 h-3.5 text-[#39A7FF]" />
            <span className="hidden sm:inline">ARCHIVE</span>
          </button>

          <button
            onClick={toggleAudio}
            title={audioActive ? 'Mute System Sounds' : 'Enable System Sounds'}
            className="p-2 text-[#B8C7FF]/70 hover:text-white bg-[#0B1020]/60 hover:bg-[#11182B] border border-[#1A1F38] rounded-md transition-colors"
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-[#39A7FF]" /> : <VolumeX className="w-4 h-4 text-white/40" />}
          </button>

          <button
            onClick={onAriseClick}
            data-cursor-arise="true"
            className="relative px-4 py-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-white bg-[#5B4BFF]/20 hover:bg-[#5B4BFF]/40 border border-[#5B4BFF]/60 hover:border-[#39A7FF] rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(91,75,255,0.2)] hover:shadow-[0_0_20px_rgba(57,167,255,0.4)] whitespace-nowrap active:scale-95"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#39A7FF]" />
              <span>ARISE</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

