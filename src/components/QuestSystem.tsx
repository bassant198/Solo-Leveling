import React, { useState, useEffect } from 'react';
import { INITIAL_QUESTS } from '../data/soloLevelingData';
import { QuestTask } from '../types';
import { CheckSquare, Square, AlertOctagon, Gift, Sparkles, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

const STORAGE_KEY = 'sololeveling_daily_quest_state_v1';

export const QuestSystem: React.FC = () => {
  const [quests, setQuests] = useState<QuestTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_QUESTS;
  });

  const [claimed, setClaimed] = useState(false);
  const [rewardClaimAnimation, setRewardClaimAnimation] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quests));
    } catch {
      // Fallback
    }
  }, [quests]);

  const toggleQuest = (id: string) => {
    sound.playSystemPing();
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextState = !q.completed;
          return {
            ...q,
            completed: nextState,
            current: nextState ? q.target : 0,
          };
        }
        return q;
      })
    );
  };

  const completedCount = quests.filter((q) => q.completed).length;
  const allCompleted = completedCount === quests.length;
  const progressPercentage = Math.round((completedCount / quests.length) * 100);

  const handleClaimReward = () => {
    if (!allCompleted || claimed) return;
    setRewardClaimAnimation(true);
    setClaimed(true);
    sound.playLevelUp();

    setTimeout(() => {
      setRewardClaimAnimation(false);
    }, 2000);
  };

  const handleReset = () => {
    sound.playSystemPing();
    setQuests(INITIAL_QUESTS);
    setClaimed(false);
  };

  return (
    <section
      id="daily-quest"
      className="relative min-h-screen py-24 px-6 bg-[#070B14] flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#5B4BFF]/10 blur-[170px] pointer-events-none" />

      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 system-scanline pointer-events-none opacity-20" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono-tech tracking-[0.3em] text-[#39A7FF] uppercase">
            <Flame className="w-4 h-4 text-[#39A7FF]" />
            <span>MANDATORY SURVIVAL PROTOCOL</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[0.2em] text-white">
            DAILY QUEST
          </h2>
          <p className="mt-2 text-xs font-mono-tech text-[#B8C7FF]/70 tracking-widest uppercase">
            PREPARATIONS TO BECOME STRONG
          </p>
        </div>

        {/* Quest Monolith Container */}
        <div className="relative bg-[#0B1020]/90 backdrop-blur-xl system-border rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Top Quest Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1A1F38] gap-4">
            <div>
              <span className="text-[11px] font-mono-tech text-[#39A7FF] tracking-widest uppercase">
                GOAL STATUS
              </span>
              <div className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                PHYSICAL CONDITIONING ({completedCount} / {quests.length})
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="text-[11px] font-mono-tech text-[#B8C7FF]/50 hover:text-white uppercase tracking-wider py-1 px-3 border border-[#1A1F38] hover:border-[#5B4BFF] rounded transition-colors"
              >
                RESET TODAY
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="my-6">
            <div className="flex justify-between items-center text-xs font-mono-tech text-[#B8C7FF]/70 mb-2">
              <span>COMPLETION RATE</span>
              <span className="text-[#39A7FF] font-bold tabular-nums">{progressPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-[#03040A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#5B4BFF] via-[#39A7FF] to-emerald-400 transition-all duration-500 shadow-[0_0_12px_#39A7FF]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Interactive Quest Tasks Checklist */}
          <div className="space-y-3.5 my-8">
            {quests.map((q) => (
              <div
                key={q.id}
                onClick={() => toggleQuest(q.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 select-none ${
                  q.completed
                    ? 'bg-[#11182B] border-[#39A7FF]/80 shadow-[0_0_15px_rgba(57,167,255,0.2)]'
                    : 'bg-[#070B14]/80 border-[#1A1F38] hover:border-[#5B4BFF]/50 hover:bg-[#0B1020]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {q.completed ? (
                    <CheckSquare className="w-5 h-5 text-[#39A7FF] shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-[#B8C7FF]/40 shrink-0" />
                  )}
                  <div>
                    <div
                      className={`text-sm sm:text-base font-bold tracking-wider font-cinzel ${
                        q.completed ? 'text-white line-through opacity-85' : 'text-white'
                      }`}
                    >
                      {q.target} {q.title.toUpperCase()}
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#B8C7FF]/50 uppercase tracking-widest">
                      UNIT: {q.unit}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono-tech text-right">
                  <span
                    className={`font-bold tabular-nums ${
                      q.completed ? 'text-emerald-400' : 'text-[#B8C7FF]/60'
                    }`}
                  >
                    {q.current} / {q.target}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Penalty Zone Warning */}
          <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/50 flex items-start gap-3 my-6">
            <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs font-mono-tech text-rose-300/90 leading-relaxed">
              <span className="font-bold text-rose-400 uppercase tracking-wider block">
                [PENALTY ZONE WARNING]
              </span>
              Failure to complete the mandatory routine before 23:59:59 will trigger an emergency
              teleportation to the Penalty Zone for 4 hours against Giant Centipedes.
            </div>
          </div>

          {/* Quest Rewards Block */}
          <div className="pt-6 border-t border-[#1A1F38] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-mono-tech text-[#39A7FF] tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5">
                <Gift className="w-4 h-4 text-[#39A7FF]" />
                <span>COMPLETION REWARDS</span>
              </div>
              <div className="text-xs font-mono-tech text-[#F4F7FF]/80 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="text-emerald-400 font-bold">+1 PLAYER LEVEL</span>
                <span>·</span>
                <span className="text-[#39A7FF] font-bold">+3 STRENGTH</span>
                <span>·</span>
                <span className="text-[#6C63FF] font-bold">+2 AGILITY</span>
                <span>·</span>
                <span className="text-white/60">FULL RECOVERY</span>
              </div>
            </div>

            <button
              onClick={handleClaimReward}
              disabled={!allCompleted || claimed}
              className={`px-8 py-3.5 rounded-lg text-xs font-mono-tech uppercase tracking-[0.25em] transition-all duration-300 whitespace-nowrap active:scale-95 ${
                claimed
                  ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : allCompleted
                  ? 'bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF] text-white shadow-[0_0_25px_rgba(91,75,255,0.5)] animate-pulse'
                  : 'bg-[#11182B] border border-[#1A1F38] text-white/30 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>{claimed ? 'REWARDS CLAIMED' : allCompleted ? 'CLAIM QUEST REWARDS' : 'COMPLETE ALL TASKS'}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
