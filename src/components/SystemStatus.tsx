import React, { useState, useEffect, useRef } from 'react';
import { Activity, Shield, Zap, Eye, Brain, Award, Crosshair } from 'lucide-react';
import { sound } from '../utils/audio';

export const SystemStatus: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Animated stat values
  const [stats, setStats] = useState({
    strength: 0,
    agility: 0,
    sense: 0,
    vitality: 0,
    intelligence: 0,
  });

  const targetStats = {
    strength: 324,
    agility: 340,
    sense: 311,
    vitality: 315,
    intelligence: 375,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          sound.playSystemPing();

          const duration = 1600; // ms
          const startTime = performance.now();

          const animateNumbers = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setStats({
              strength: Math.floor(targetStats.strength * ease),
              agility: Math.floor(targetStats.agility * ease),
              sense: Math.floor(targetStats.sense * ease),
              vitality: Math.floor(targetStats.vitality * ease),
              intelligence: Math.floor(targetStats.intelligence * ease),
            });

            if (progress < 1) {
              requestAnimationFrame(animateNumbers);
            }
          };

          requestAnimationFrame(animateNumbers);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  const statItems = [
    { label: 'STRENGTH', value: stats.strength, target: targetStats.strength, max: 400, icon: Shield, note: 'Physical damage & lifting threshold' },
    { label: 'AGILITY', value: stats.agility, target: targetStats.agility, max: 400, icon: Zap, note: 'Movement velocity, evasion & reflexes' },
    { label: 'SENSE', value: stats.sense, target: targetStats.sense, max: 400, icon: Eye, note: 'Perception of hostile mana & intent' },
    { label: 'VITALITY', value: stats.vitality, target: targetStats.vitality, max: 400, icon: Activity, note: 'Health pool, stamina & toxin resistance' },
    { label: 'INTELLIGENCE', value: stats.intelligence, target: targetStats.intelligence, max: 400, icon: Brain, note: 'Mana capacity & Shadow summon limits' },
  ];

  return (
    <section
      ref={sectionRef}
      id="status"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center bg-[#070B14] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B4BFF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-[#39A7FF]/10 blur-[130px] pointer-events-none" />

      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 system-scanline pointer-events-none opacity-20" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-tech tracking-[0.3em] text-[#39A7FF] uppercase">
            <Crosshair className="w-4 h-4 text-[#39A7FF]" />
            <span>NEURAL INTERFACE LINKED</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.2em] text-white">
            PLAYER STATUS
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#39A7FF] to-transparent mt-4" />
        </div>

        {/* The System Holographic Container */}
        <div className="relative bg-[#0B1020]/90 backdrop-blur-xl system-border rounded-xl p-6 sm:p-10 overflow-hidden">
          {/* Top Hologram Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#1A1F38] gap-4">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 rounded-lg bg-[#11182B] border border-[#5B4BFF]/40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,167,255,0.25)_0%,transparent_70%)]" />
                <Award className="w-8 h-8 text-[#39A7FF] drop-shadow-[0_0_10px_#39A7FF]" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tech tracking-[0.3em] text-[#B8C7FF]/60 uppercase">
                  NAME
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.1em] text-white">
                  SUNG JIN-WOO
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-10 font-mono-tech text-left sm:text-right">
              <div>
                <div className="text-[11px] tracking-widest text-[#B8C7FF]/50 uppercase">LEVEL</div>
                <div className="text-xl sm:text-2xl font-bold text-[#39A7FF] tabular-nums">146</div>
              </div>
              <div>
                <div className="text-[11px] tracking-widest text-[#B8C7FF]/50 uppercase">CLASS</div>
                <div className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">SHADOW MONARCH</div>
              </div>
              <div>
                <div className="text-[11px] tracking-widest text-[#B8C7FF]/50 uppercase">RANK</div>
                <div className="text-xl sm:text-2xl font-bold text-[#6C63FF]">S-RANK</div>
              </div>
            </div>
          </div>

          {/* Vitals: HP & MP Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 p-4 rounded-lg bg-[#070B14]/80 border border-[#1A1F38]">
            {/* HP */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono-tech mb-2">
                <span className="text-emerald-400 font-semibold tracking-wider">HEALTH POINTS (HP)</span>
                <span className="text-white/80 tabular-nums">98,240 / 98,240</span>
              </div>
              <div className="h-2 w-full bg-[#11182B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-1000"
                  style={{ width: animated ? '100%' : '0%' }}
                />
              </div>
            </div>

            {/* MP */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono-tech mb-2">
                <span className="text-[#39A7FF] font-semibold tracking-wider">MANA POINTS (MP)</span>
                <span className="text-white/80 tabular-nums">125,600 / 125,600</span>
              </div>
              <div className="h-2 w-full bg-[#11182B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF] shadow-[0_0_10px_rgba(57,167,255,0.5)] transition-all duration-1000"
                  style={{ width: animated ? '100%' : '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Primary Stats Grid */}
          <div className="space-y-5 my-8">
            <div className="text-xs font-mono-tech tracking-[0.25em] text-[#B8C7FF]/70 uppercase pb-1 flex items-center justify-between">
              <span>CORE ATTRIBUTES</span>
              <span className="text-[#39A7FF]">UNASSIGNED STAT POINTS: 0</span>
            </div>

            <div className="space-y-4">
              {statItems.map((st) => {
                const IconComponent = st.icon;
                const percentage = Math.min(100, Math.round((st.value / st.max) * 100));

                return (
                  <div
                    key={st.label}
                    className="p-3.5 rounded-lg bg-[#070B14]/60 border border-[#1A1F38] hover:border-[#5B4BFF]/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 font-mono-tech">
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-4 h-4 text-[#39A7FF]" />
                        <span className="text-xs font-semibold text-white tracking-widest">{st.label}</span>
                        <span className="hidden md:inline text-[11px] text-[#B8C7FF]/40 font-normal">
                          · {st.note}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#B8C7FF]/50 tabular-nums">
                          CAP: {st.max}
                        </span>
                        <span className="text-base font-bold text-white tabular-nums tracking-wider min-w-[3rem] text-right">
                          {st.value}
                        </span>
                      </div>
                    </div>

                    {/* Technical Bar */}
                    <div className="h-1.5 w-full bg-[#11182B] rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF] transition-all duration-500 ease-out shadow-[0_0_8px_#39A7FF]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Perks & Titles Footer */}
          <div className="mt-8 pt-6 border-t border-[#1A1F38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech text-[#B8C7FF]/70">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-white">ACTIVE TITLES:</span>
              <span className="text-[#39A7FF]">The One Who Overcomes Adversity</span>
              <span className="text-white/30">·</span>
              <span className="text-[#B8C7FF]">Demon Hunter</span>
            </div>
            <div className="text-[11px] text-[#39A7FF] tracking-wider uppercase">
              STATUS EFFECT: PERFECT EQUILIBRIUM
            </div>
          </div>

          {/* Canon Law of Awakened Mana Note */}
          <div className="mt-6 pt-4 border-t border-[#1A1F38]/60 p-3.5 rounded-lg bg-[#070B14] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono-tech text-[#B8C7FF]/60">
            <div className="leading-relaxed">
              <span className="text-[#39A7FF] font-bold">CANONICAL PLAYER SYSTEM ANOMALY:</span> While all other hunters are
              permanently bound to their awakened mana ceiling, Sung Jin-Woo alone increases his skills, attributes, and rank
              through the System interface.
            </div>
            <div className="shrink-0 text-[#B8C7FF]/40 text-right">
              SOURCE: Official Anime Story Introduction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
