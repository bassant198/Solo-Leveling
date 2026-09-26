import React, { useState } from 'react';
import { GATES } from '../data/gates';
import { Gate } from '../types/canon';
import { GateDetailModal } from './GateDetailModal';
import { AlertTriangle, MapPin, Activity, Users, ShieldAlert, Radio, BookOpen, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const GateSystem: React.FC = () => {
  const [selectedGateId, setSelectedGateId] = useState<string>(GATES[0].id);
  const [modalGate, setModalGate] = useState<Gate | null>(null);

  const activeGate = GATES.find((g) => g.id === selectedGateId) || GATES[0];
  const isRedGate = activeGate.type === 'RED_GATE';
  const isDoubleDungeon = activeGate.type === 'DOUBLE_DUNGEON';
  const isSRank = activeGate.rank === 'S' || activeGate.dangerLevel === 'EXTREME';

  const handleSelectGate = (gate: Gate) => {
    setSelectedGateId(gate.id);
    if (gate.type === 'RED_GATE' || gate.rank === 'S') {
      sound.playGateWarning();
    } else {
      sound.playSystemPing();
    }
  };

  return (
    <section
      id="gates"
      className={`relative min-h-screen py-24 px-6 transition-colors duration-700 overflow-hidden ${
        isRedGate
          ? 'bg-[#0E0307]'
          : isDoubleDungeon
          ? 'bg-[#05060E]'
          : 'bg-[#03040A]'
      }`}
    >
      {/* S-Rank / Red Gate Ambient Aura */}
      {isRedGate && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-rose-600/15 blur-[180px] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.12)_0%,transparent_75%)]" />
        </div>
      )}

      {isDoubleDungeon && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B4BFF]/12 blur-[170px] animate-pulse" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#1A1F38] pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono-tech tracking-[0.3em] text-[#39A7FF] uppercase">
              <Radio className="w-4 h-4 text-[#39A7FF] animate-pulse" />
              <span>DIMENSIONAL RIFT SENSOR GRID // CANONICAL PHENOMENA</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[0.15em] text-white">
              GATE ANOMALIES
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#B8C7FF]/70">
            <span>GRID CLASSIFICATIONS:</span>
            <span className="text-[#39A7FF] font-bold">STANDARD · RED GATE · DOUBLE DUNGEON</span>
          </div>
        </div>

        {/* Gate Selection Cards Track */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-10">
          {GATES.map((g) => {
            const isSelected = selectedGateId === g.id;
            const gateIsRed = g.type === 'RED_GATE';
            const gateIsDouble = g.type === 'DOUBLE_DUNGEON';

            return (
              <button
                key={g.id}
                onClick={() => handleSelectGate(g)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? gateIsRed
                      ? 'bg-rose-950/50 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.35)] scale-[1.02]'
                      : gateIsDouble
                      ? 'bg-[#11182B] border-[#5B4BFF] shadow-[0_0_20px_rgba(91,75,255,0.35)] scale-[1.02]'
                      : 'bg-[#11182B] border-[#39A7FF] shadow-[0_0_20px_rgba(57,167,255,0.3)] scale-[1.02]'
                    : 'bg-[#070B14]/80 border-[#1A1F38] hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase tracking-widest truncate mb-1">
                  {g.type.replace('_', ' ')}
                </div>
                <div
                  className={`font-cinzel text-lg sm:text-xl font-bold truncate ${
                    gateIsRed ? 'text-rose-400' : gateIsDouble ? 'text-[#B8C7FF]' : 'text-white'
                  }`}
                >
                  {g.rank}-RANK
                </div>
                <div className="text-[10px] font-mono-tech text-[#B8C7FF]/60 truncate mt-0.5">
                  {g.name.split('(')[0]}
                </div>

                {gateIsRed && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
                {gateIsDouble && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5B4BFF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Gate Portal & Tactical Spec Viewport */}
        <div
          className={`relative rounded-2xl overflow-hidden border p-6 sm:p-10 transition-all duration-500 ${
            isRedGate
              ? 'bg-[#0E050A]/95 system-border-crimson'
              : isDoubleDungeon
              ? 'bg-[#080B14]/95 system-border'
              : 'bg-[#070B14]/90 system-border'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Portal Column (7 cols) */}
            <div className="lg:col-span-7 relative aspect-video rounded-xl overflow-hidden bg-[#03040A] border border-[#1A1F38] flex items-center justify-center">
              <img
                src={activeGate.image || '/src/assets/images/gate_s_rank_vortex_1790458725346.jpg'}
                alt={activeGate.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isRedGate
                    ? 'scale-105 saturate-150 contrast-125'
                    : isDoubleDungeon
                    ? 'scale-100 brightness-90 hue-rotate-[220deg]'
                    : 'scale-100 saturate-100'
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#03040A] via-transparent to-transparent opacity-80" />

              {/* In-Frame Status Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded bg-[#03040A]/85 backdrop-blur-md border border-[#1A1F38]">
                <Activity className={`w-4 h-4 ${isRedGate ? 'text-rose-500 animate-pulse' : 'text-[#39A7FF]'}`} />
                <span className="text-xs font-mono-tech tracking-wider uppercase text-white font-semibold">
                  PHENOMENON: {activeGate.type.replace('_', ' ')}
                </span>
              </div>

              {/* Dynamic Warning Banners */}
              {isRedGate && (
                <div className="absolute bottom-4 inset-x-4 z-20 p-3 rounded-lg bg-rose-950/85 backdrop-blur-md border border-rose-500/50 flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 animate-bounce" />
                  <div>
                    <div className="text-xs font-bold font-mono-tech text-rose-300 tracking-widest uppercase">
                      RED GATE LOCK DETECTED · ZERO COMMUNICATION
                    </div>
                    <div className="text-[11px] text-white/80 font-mono-tech">
                      Exit portal severed. Egress impossible until dungeon boss is dead.
                    </div>
                  </div>
                </div>
              )}

              {isDoubleDungeon && (
                <div className="absolute bottom-4 inset-x-4 z-20 p-3 rounded-lg bg-[#070B14]/85 backdrop-blur-md border border-[#5B4BFF]/50 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#39A7FF] shrink-0" />
                  <div>
                    <div className="text-xs font-bold font-mono-tech text-[#39A7FF] tracking-widest uppercase">
                      CARTENON TEMPLE SACRED GROUND
                    </div>
                    <div className="text-[11px] text-white/80 font-mono-tech">
                      Hidden secondary dungeon. Birthplace of the Player System.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tactical Intel Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39A7FF] tracking-widest uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#39A7FF]" />
                  <span>{activeGate.location}</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {activeGate.name}
                </h3>
              </div>

              <p className="text-xs text-[#B8C7FF]/80 leading-relaxed font-mono-tech">
                {activeGate.visualDescription}
              </p>

              {/* Boss & Environment Card */}
              <div className="p-3.5 rounded-lg bg-[#03040A] border border-[#1A1F38] space-y-1">
                <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase">PRIMARY BOSS THREAT</div>
                <div className="text-sm font-bold text-white font-cinzel">{activeGate.boss}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#03040A] border border-[#1A1F38] space-y-1">
                <div className="text-[10px] font-mono-tech text-[#39A7FF] uppercase">INTERNAL ENVIRONMENT</div>
                <div className="text-xs font-mono-tech text-[#F4F7FF]/80">{activeGate.environment}</div>
              </div>

              {/* Action Button: Open Gate Recon File */}
              <button
                onClick={() => {
                  sound.playSystemPing();
                  setModalGate(activeGate);
                }}
                className="w-full py-3 rounded-lg bg-[#11182B] hover:bg-[#1A1F38] border border-[#39A7FF]/50 hover:border-[#39A7FF] text-xs font-mono-tech text-white uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_15px_rgba(57,167,255,0.2)] flex items-center justify-center gap-2 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#39A7FF]" />
                <span>INSPECT FULL GATE RECON FILE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <GateDetailModal
        gate={modalGate}
        onClose={() => setModalGate(null)}
      />
    </section>
  );
};
