import React, { useState, useEffect } from 'react';
import { UserHunterProfile } from '../types';
import { Shield, Sparkles, RefreshCw, CheckCircle2, User, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

const STORAGE_KEY = 'sololeveling_user_hunter_profile_v1';

export const HunterProfile: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [selectedClass, setSelectedClass] = useState<UserHunterProfile['hunterClass']>('ASSASSIN');
  const [profile, setProfile] = useState<UserHunterProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  const generateProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = userName.trim() || 'UNKNOWN HUNTER';
    setIsGenerating(true);
    sound.playAriseSurge();

    setTimeout(() => {
      // Procedurally generate authentic Hunter profile
      const ranks: UserHunterProfile['rank'][] = ['S', 'A', 'B', 'A', 'S', 'National Level'];
      const assignedRank = ranks[Math.floor(Math.random() * ranks.length)];

      const isHighTier = assignedRank === 'S' || assignedRank === 'National Level';
      const level = isHighTier ? Math.floor(Math.random() * 60) + 75 : Math.floor(Math.random() * 40) + 20;

      const newProfile: UserHunterProfile = {
        name: finalName,
        hunterClass: selectedClass,
        rank: assignedRank,
        level,
        strength: Math.floor(Math.random() * 120) + (isHighTier ? 180 : 80),
        agility: Math.floor(Math.random() * 120) + (isHighTier ? 190 : 85),
        intelligence: Math.floor(Math.random() * 120) + (isHighTier ? 170 : 70),
        vitality: Math.floor(Math.random() * 120) + (isHighTier ? 175 : 75),
        shadowsCommanded: isHighTier ? Math.floor(Math.random() * 50) + 12 : Math.floor(Math.random() * 8) + 1,
        awakeningDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        title: isHighTier ? 'Vessel of the Primordial Sovereign' : 'The Relentless Challenger',
      };

      setProfile(newProfile);
      setIsGenerating(false);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      } catch {
        // Fallback
      }
    }, 700);
  };

  const hunterClasses: UserHunterProfile['hunterClass'][] = [
    'ASSASSIN',
    'MAGE',
    'TANK',
    'FIGHTER',
    'RANGER',
    'HEALER',
  ];

  return (
    <section
      id="hunter-profile"
      className="relative min-h-screen py-24 px-6 bg-[#03040A] flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#39A7FF]/8 blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono-tech tracking-[0.3em] text-[#39A7FF] uppercase">
            <User className="w-4 h-4 text-[#39A7FF]" />
            <span>KOREAN HUNTERS ASSOCIATION RECOGNITION</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[0.15em] text-white">
            HUNTER AWAKENING
          </h2>
          <p className="mt-2 text-xs font-mono-tech text-[#B8C7FF]/70 tracking-widest uppercase">
            CALIBRATE YOUR MANA RESONANCE & RECEIVE OFFICIAL CLASSIFICATION
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Awakening Configuration (5 cols) */}
          <div className="lg:col-span-5 bg-[#070B14]/90 border border-[#1A1F38] rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-cinzel text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#39A7FF]" />
              <span>AWAKENING PROTOCOL</span>
            </h3>

            <form onSubmit={generateProfile} className="space-y-6">
              <div>
                <label className="block text-xs font-mono-tech tracking-wider uppercase text-[#B8C7FF]/80 mb-2">
                  HUNTER NAME
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter name (e.g. Bassant)"
                  className="w-full px-4 py-3 bg-[#03040A] border border-[#1A1F38] focus:border-[#39A7FF] rounded-lg text-white font-mono-tech text-sm tracking-wider outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech tracking-wider uppercase text-[#B8C7FF]/80 mb-2">
                  CHOOSE HUNTER DISCIPLINE
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {hunterClasses.map((cls) => {
                    const isSelected = selectedClass === cls;
                    return (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => {
                          setSelectedClass(cls);
                          sound.playSystemPing();
                        }}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-mono-tech tracking-wider transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#11182B] border-[#5B4BFF] text-white shadow-[0_0_12px_rgba(91,75,255,0.3)]'
                            : 'bg-[#03040A] border-[#1A1F38] text-[#B8C7FF]/60 hover:text-white hover:border-[#1A1F38]/80'
                        }`}
                      >
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                data-cursor-arise="true"
                className="w-full py-3.5 bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF] hover:from-[#6C63FF] hover:to-[#5B4BFF] text-white font-mono-tech text-xs uppercase tracking-[0.25em] font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(91,75,255,0.4)] active:scale-95 disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>EVALUATING MANA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{profile ? 'RE-AWAKEN PROFILE' : 'COMMENCE AWAKENING'}</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Right Card: Holographic Hunter License (7 cols) */}
          <div className="lg:col-span-7">
            {profile ? (
              <div className="relative bg-[#0B1020]/95 system-border-cyan rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                {/* Holographic Watermark & Badge */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#39A7FF]/15 to-transparent blur-3xl pointer-events-none" />

                {/* License Top Header */}
                <div className="flex items-start justify-between pb-6 border-b border-[#1A1F38]">
                  <div>
                    <div className="text-[10px] font-mono-tech text-[#39A7FF] tracking-[0.3em] uppercase">
                      OFFICIAL HUNTER LICENSE
                    </div>
                    <div className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {profile.name.toUpperCase()}
                    </div>
                    <div className="text-xs font-mono-tech text-[#B8C7FF]/60 mt-0.5">
                      TITLE: {profile.title}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="px-4 py-1.5 rounded bg-[#11182B] border border-[#39A7FF]/50 text-xl font-bold font-cinzel text-[#39A7FF] shadow-[0_0_15px_rgba(57,167,255,0.3)]">
                      {profile.rank}-RANK
                    </div>
                    <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 mt-1 uppercase">
                      LEVEL {profile.level}
                    </div>
                  </div>
                </div>

                {/* License Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 py-4 border-y border-[#1A1F38]/60 font-mono-tech">
                  <div>
                    <div className="text-[10px] text-[#B8C7FF]/50 uppercase">CLASS</div>
                    <div className="text-sm font-bold text-white mt-0.5">{profile.hunterClass}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#B8C7FF]/50 uppercase">AWAKENED</div>
                    <div className="text-sm font-bold text-[#39A7FF] mt-0.5">{profile.awakeningDate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#B8C7FF]/50 uppercase">SHADOWS</div>
                    <div className="text-sm font-bold text-[#6C63FF] mt-0.5">{profile.shadowsCommanded} EXTRACTED</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#B8C7FF]/50 uppercase">STATUS</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">ACTIVE SOVEREIGN</div>
                  </div>
                </div>

                {/* Attribute Bars */}
                <div className="space-y-3 font-mono-tech">
                  <div>
                    <div className="flex justify-between text-xs text-[#B8C7FF]/80 mb-1">
                      <span>STRENGTH</span>
                      <span className="text-white font-bold tabular-nums">{profile.strength}</span>
                    </div>
                    <div className="h-1.5 bg-[#03040A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF]"
                        style={{ width: `${Math.min(100, (profile.strength / 300) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#B8C7FF]/80 mb-1">
                      <span>AGILITY</span>
                      <span className="text-white font-bold tabular-nums">{profile.agility}</span>
                    </div>
                    <div className="h-1.5 bg-[#03040A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF]"
                        style={{ width: `${Math.min(100, (profile.agility / 300) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#B8C7FF]/80 mb-1">
                      <span>INTELLIGENCE</span>
                      <span className="text-white font-bold tabular-nums">{profile.intelligence}</span>
                    </div>
                    <div className="h-1.5 bg-[#03040A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#39A7FF]"
                        style={{ width: `${Math.min(100, (profile.intelligence / 300) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Verification Stamp */}
                <div className="mt-8 pt-4 border-t border-[#1A1F38] flex items-center justify-between text-[11px] font-mono-tech text-[#B8C7FF]/50">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SYSTEM BIOMETRICS VERIFIED</span>
                  </span>
                  <span>ID: #SL-{profile.level}884-{profile.rank}</span>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[350px] rounded-2xl bg-[#070B14]/60 border border-dashed border-[#1A1F38] flex flex-col items-center justify-center p-8 text-center">
                <Shield className="w-12 h-12 text-white/20 mb-3" />
                <h4 className="font-cinzel text-lg font-bold text-white/60 mb-1">
                  NO HUNTER LICENSE REGISTERED
                </h4>
                <p className="text-xs font-mono-tech text-[#B8C7FF]/40 max-w-sm">
                  Enter your hunter name on the left and trigger the awakening ritual to inspect your system stats.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
