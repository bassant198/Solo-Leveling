import React, { useState } from 'react';
import { SHADOWS } from '../data/shadows';
import { Shadow } from '../types/canon';
import { Sparkles, Shield, Skull, Sword, Zap, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

export const ShadowArmy: React.FC = () => {
  const [activeShadow, setActiveShadow] = useState<Shadow>(SHADOWS[0]);
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonCount, setSummonCount] = useState(130840);
  const [materializing, setMaterializing] = useState(false);

  const handleSummon = () => {
    if (isSummoning) return;
    setIsSummoning(true);
    sound.playAriseSurge();

    // Increment shadow count
    setSummonCount((prev) => prev + 1);

    setTimeout(() => {
      setIsSummoning(false);
    }, 1800);
  };

  const handleSelectShadow = (shadow: Shadow) => {
    if (shadow.id === activeShadow.id) return;
    setMaterializing(true);
    sound.playSystemPing();
    setActiveShadow(shadow);

    setTimeout(() => {
      setMaterializing(false);
    }, 600);
  };

  return (
    <section
      id="shadow-army"
      className="relative min-h-screen py-24 px-6 bg-[#03040A] text-white overflow-hidden"
    >
      {/* Dynamic Summon Shockwave Overlay */}
      {isSummoning && (
        <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-[#03040A]/80 backdrop-blur-sm animate-pulse" />
          <div className="w-[800px] h-[800px] rounded-full border-2 border-[#5B4BFF] animate-ping opacity-60" />
          <div className="w-[500px] h-[500px] rounded-full bg-[#39A7FF]/20 blur-[100px] animate-pulse" />
          <div className="relative z-50 font-cinzel text-5xl sm:text-7xl font-black tracking-[0.3em] text-white drop-shadow-[0_0_40px_#5B4BFF] animate-bounce">
            ARISE.
          </div>
        </div>
      )}

      {/* Deep Shadow Mist & Dark Particle Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[#5B4BFF]/8 blur-[180px] animate-shadow-drift" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-[#11182B]/60 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1A1F38] pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono-tech tracking-[0.3em] text-[#6C63FF] uppercase">
              <Skull className="w-4 h-4 text-[#6C63FF]" />
              <span>THE ETERNAL DOMAIN OF DEATH // OFFICIAL SHADOW VISUAL ROSTER</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[0.2em] text-white">
              SHADOW ARMY
            </h2>
          </div>

          {/* Shadow Counter & Summon CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 px-5 rounded-lg bg-[#070B14] border border-[#1A1F38]">
              <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase tracking-wider">
                SHADOW LEGION ACTIVE
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono-tech text-[#39A7FF] tabular-nums">
                {summonCount.toLocaleString()} <span className="text-xs text-white/50">SOLDIERS</span>
              </div>
            </div>

            <button
              onClick={handleSummon}
              disabled={isSummoning}
              data-cursor-arise="true"
              className="relative px-7 py-3.5 text-xs font-mono-tech uppercase tracking-[0.25em] text-white bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF] hover:from-[#6C63FF] hover:to-[#5B4BFF] rounded-md transition-all duration-300 shadow-[0_0_25px_rgba(91,75,255,0.4)] hover:shadow-[0_0_35px_rgba(57,167,255,0.6)] active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              <span className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-white" />
                <span>SUMMON SHADOW</span>
              </span>
            </button>
          </div>
        </div>

        {/* Featured Commander Tabs (Official Anime Roster) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {SHADOWS.map((sol) => {
            const isSelected = activeShadow.id === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => handleSelectShadow(sol)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#11182B] border-[#5B4BFF] shadow-[0_0_25px_rgba(91,75,255,0.3)]'
                    : 'bg-[#070B14]/80 border-[#1A1F38] hover:border-[#5B4BFF]/40 hover:bg-[#0B1020]'
                }`}
              >
                <div className="text-[10px] font-mono-tech text-[#39A7FF] uppercase tracking-wider mb-1 truncate">
                  {sol.rank ? sol.rank.split('→')[0].trim() : sol.type}
                </div>
                <div className="font-cinzel text-base font-bold text-white truncate">
                  {sol.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Materialization Stage Viewport */}
        <div className="relative bg-[#070B14]/90 border border-[#1A1F38] rounded-2xl overflow-hidden p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[3/4] rounded-xl overflow-hidden bg-[#03040A] border border-[#1A1F38] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,75,255,0.25)_0%,transparent_75%)]" />

              {/* Materialization blur & fade transition */}
              <div
                className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ${
                  materializing ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-0'
                }`}
              >
                {activeShadow.image ? (
                  <img
                    src={activeShadow.image}
                    alt={activeShadow.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#11182B] border border-[#5B4BFF]/50 flex items-center justify-center mb-4">
                      <Shield className="w-10 h-10 text-[#39A7FF]" />
                    </div>
                    <div className="font-cinzel text-xl font-bold text-white mb-2">{activeShadow.name}</div>
                    <div className="text-xs font-mono-tech text-[#B8C7FF]/60 uppercase">{activeShadow.rank || activeShadow.type}</div>
                  </div>
                )}
              </div>

              {/* Hologram Badge */}
              <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-[#03040A]/85 backdrop-blur-md border border-[#5B4BFF]/40 rounded text-xs font-mono-tech text-[#39A7FF] tracking-wider uppercase">
                {activeShadow.type}
              </div>
            </div>

            {/* Information Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="text-xs font-mono-tech text-[#39A7FF] tracking-[0.2em] uppercase mb-1">
                  EXTRACTION ID: #{activeShadow.id.toUpperCase()}
                </div>
                <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                  {activeShadow.name}
                </h3>
                <div className="text-xs font-mono-tech text-[#B8C7FF]/70 mt-1">
                  FORMER IDENTITY: <span className="text-white font-semibold">{activeShadow.originalName}</span>
                </div>
              </div>

              {/* Extraction Lore Box */}
              <div className="p-4 rounded-lg bg-[#0B1020] border border-[#1A1F38] space-y-1">
                <div className="text-[10px] font-mono-tech text-[#39A7FF] uppercase tracking-wider font-bold">
                  CANONICAL EXTRACTION ORIGIN
                </div>
                <div className="text-xs text-[#F4F7FF]/85 leading-relaxed font-mono-tech">
                  {activeShadow.origin}
                </div>
              </div>

              {/* Verified Abilities Box */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono-tech text-[#6C63FF] uppercase tracking-wider font-bold">
                  VERIFIED SHADOW POWERS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeShadow.abilities.map((ab, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-[#03040A] border border-[#1A1F38] text-xs font-mono-tech text-[#F4F7FF]/90 flex items-start gap-2"
                    >
                      <span className="text-[#39A7FF] mt-0.5">●</span>
                      <span>{ab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tactical Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono-tech">
                <div className="p-3 rounded bg-[#03040A] border border-[#1A1F38]">
                  <div className="text-[10px] text-[#B8C7FF]/50 uppercase">CANON RANK</div>
                  <div className="text-sm font-bold text-white mt-0.5 truncate">{activeShadow.rank || 'Not Specified'}</div>
                </div>
                <div className="p-3 rounded bg-[#03040A] border border-[#1A1F38]">
                  <div className="text-[10px] text-[#B8C7FF]/50 uppercase">SIGNATURE WEAPON</div>
                  <div className="text-sm font-bold text-[#39A7FF] mt-0.5 truncate">{activeShadow.weapon || 'Natural Claws'}</div>
                </div>
                <div className="p-3 rounded bg-[#03040A] border border-[#1A1F38]">
                  <div className="text-[10px] text-[#B8C7FF]/50 uppercase">FIRST SUMMON</div>
                  <div className="text-sm font-bold text-[#6C63FF] mt-0.5 truncate">{activeShadow.firstAppearance}</div>
                </div>
              </div>

              {/* Source verification footer */}
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono-tech text-[#B8C7FF]/50 border-t border-[#1A1F38]">
                <BookOpen className="w-3.5 h-3.5 text-[#39A7FF]" />
                <span>SOURCE: {activeShadow.sourceCitation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
