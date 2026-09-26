import React from 'react';
import { Gate } from '../types/canon';
import { X, AlertTriangle, ShieldAlert, MapPin, Activity, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface GateDetailModalProps {
  gate: Gate | null;
  onClose: () => void;
}

export const GateDetailModal: React.FC<GateDetailModalProps> = ({ gate, onClose }) => {
  if (!gate) return null;

  const isRedGate = gate.type === 'RED_GATE';
  const isDoubleDungeon = gate.type === 'DOUBLE_DUNGEON';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#03040A]/90 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl my-8 border transition-colors ${
          isRedGate
            ? 'bg-[#0E050A] system-border-crimson'
            : isDoubleDungeon
            ? 'bg-[#070A12] border-[#5B4BFF]/50 shadow-[0_0_40px_rgba(91,75,255,0.25)]'
            : 'bg-[#0B1020] system-border'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1F38] bg-[#070B14]">
          <div className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isRedGate
                  ? 'bg-rose-500 shadow-[0_0_10px_#F43F5E] animate-ping'
                  : isDoubleDungeon
                  ? 'bg-[#5B4BFF] shadow-[0_0_10px_#5B4BFF]'
                  : 'bg-[#39A7FF] shadow-[0_0_10px_#39A7FF]'
              }`}
            />
            <span
              className={`font-mono-tech text-xs tracking-[0.25em] uppercase font-bold ${
                isRedGate ? 'text-rose-400' : isDoubleDungeon ? 'text-[#B8C7FF]' : 'text-[#39A7FF]'
              }`}
            >
              DIMENSIONAL RECON RECORD // {gate.type.replace('_', ' ')}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playSystemPing();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#11182B] hover:bg-[#1A1F38] text-[#B8C7FF]/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Visual & Intel Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Visual Frame (5 cols) */}
            <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#03040A] border border-[#1A1F38]">
              {gate.image ? (
                <img
                  src={gate.image}
                  alt={gate.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${
                    isRedGate ? 'saturate-150 contrast-125' : ''
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Layers className="w-12 h-12 text-[#39A7FF]/40 mb-3" />
                  <span className="font-mono-tech text-xs text-[#B8C7FF]/60 uppercase">
                    DIMENSIONAL SIMULATION ACTIVE
                  </span>
                </div>
              )}

              {/* In-Frame Rank Badge */}
              <div
                className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-mono-tech font-bold tracking-widest uppercase backdrop-blur-md border ${
                  isRedGate
                    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300'
                    : 'bg-[#03040A]/80 border-[#39A7FF]/50 text-[#39A7FF]'
                }`}
              >
                {gate.rank}-RANK GATE
              </div>
            </div>

            {/* Core Info (7 cols) */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39A7FF]">
                <MapPin className="w-4 h-4 text-[#39A7FF]" />
                <span>{gate.location}</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
                {gate.name}
              </h3>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-tech text-xs">
                <span className="px-2.5 py-0.5 rounded bg-[#11182B] text-white/80 border border-[#1A1F38]">
                  TYPE: {gate.type.replace('_', ' ')}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded font-bold ${
                    gate.dangerLevel === 'EXTREME'
                      ? 'bg-rose-950 text-rose-400 border border-rose-600'
                      : 'bg-amber-950 text-amber-400 border border-amber-600'
                  }`}
                >
                  DANGER: {gate.dangerLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#11182B] text-emerald-400 border border-emerald-800">
                  STATUS: {gate.status}
                </span>
              </div>

              <p className="text-xs text-[#B8C7FF]/80 leading-relaxed font-mono-tech pt-2">
                {gate.visualDescription}
              </p>
            </div>
          </div>

          {/* Red Gate Warning or Double Dungeon Callout */}
          {isRedGate && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-600/70 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
              <div className="text-xs font-mono-tech text-rose-200 leading-relaxed">
                <span className="font-bold text-rose-300 uppercase tracking-widest block mb-0.5">
                  RED GATE QUARANTINE PROTOCOL
                </span>
                Upon crossing the threshold, the entrance snaps shut into an impenetrable dimensional lock.
                Communication signals cannot penetrate the barrier. Hunters cannot exit under any circumstance
                until the dungeon boss is eradicated or all entrants perish.
              </div>
            </div>
          )}

          {isDoubleDungeon && (
            <div className="p-4 rounded-xl bg-[#5B4BFF]/15 border border-[#5B4BFF]/50 flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-[#39A7FF] shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs font-mono-tech text-[#F4F7FF]/90 leading-relaxed">
                <span className="font-bold text-[#39A7FF] uppercase tracking-widest block mb-0.5">
                  CARTENON TEMPLE DOUBLE DUNGEON PHENOMENON
                </span>
                A concealed secondary sanctuary found only by venturing past an ordinary low-rank boss chamber.
                Enforces three commandments: 1. Worship God; 2. Praise God; 3. Prove your Faith. Those who fail
                are pulverized by the divine stone effigies.
              </div>
            </div>
          )}

          {/* Tactical Specs: Boss, Monsters, Environment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38] space-y-2">
              <span className="text-[11px] font-mono-tech text-[#39A7FF] uppercase font-bold block">
                PRIMARY BOSS
              </span>
              <div className="font-cinzel text-lg font-bold text-white">
                {gate.boss}
              </div>
              <span className="text-[11px] font-mono-tech text-[#B8C7FF]/50 uppercase font-bold block pt-2">
                DOCUMENTED MONSTERS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {gate.monsters.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#11182B] text-xs font-mono-tech text-[#F4F7FF]/80"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38] space-y-2">
              <span className="text-[11px] font-mono-tech text-[#39A7FF] uppercase font-bold block">
                INTERNAL BIOME & ENVIRONMENT
              </span>
              <p className="text-xs font-mono-tech text-[#B8C7FF]/80 leading-relaxed">
                {gate.environment}
              </p>
              <span className="text-[11px] font-mono-tech text-[#B8C7FF]/50 uppercase font-bold block pt-2">
                FIRST RECORDED INCIDENT
              </span>
              <p className="text-xs font-mono-tech text-white">
                {gate.storyArc} · {gate.episodeAppearance}
              </p>
            </div>
          </div>

          {/* Special Properties List */}
          <div>
            <span className="text-xs font-mono-tech text-[#39A7FF] uppercase tracking-widest block mb-2 font-bold">
              CANONICAL PHENOMENA & SPECIAL PROPERTIES
            </span>
            <div className="space-y-1.5">
              {gate.specialProperties.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#070B14] border border-[#1A1F38] text-xs font-mono-tech text-[#F4F7FF]/85 flex items-start gap-2"
                >
                  <span className="text-[#39A7FF]">◆</span>
                  <span>{sp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source Citation */}
          <div className="pt-4 border-t border-[#1A1F38] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono-tech text-[#B8C7FF]/60">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#39A7FF]" />
              <span>SOURCE: {gate.sourceCitation}</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#11182B] text-white/80">
              VERIFIED: TRUE · {gate.canonSource}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
