import React, { useState, useMemo } from 'react';
import {
  searchSystemArchive,
  GlobalSearchResult,
  CHARACTERS,
  SHADOWS,
  GATES,
  DUNGEONS,
  MONSTERS,
  GUILDS,
  EPISODES,
  STORY_ARCS,
  HUNTER_RANKS,
  CANON_RANK_SYSTEM_EXPLANATION,
} from '../data';
import { Character, Gate, Shadow } from '../types/canon';
import { CharacterDetailModal } from './CharacterDetailModal';
import { GateDetailModal } from './GateDetailModal';
import {
  Search,
  X,
  Database,
  Filter,
  Eye,
  Shield,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle,
  Skull,
  Radio,
  Tv,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface SystemArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchiveModal: React.FC<SystemArchiveModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [allowMangaSpoilers, setAllowMangaSpoilers] = useState(false);

  // Selected item modal targets
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedGate, setSelectedGate] = useState<Gate | null>(null);
  const [viewingShadow, setViewingShadow] = useState<Shadow | null>(null);

  const categories = [
    'ALL',
    'Characters',
    'Shadows',
    'Gates',
    'Dungeons',
    'Monsters',
    'Guilds',
    'Episodes',
  ];

  const searchResults = useMemo(() => {
    return searchSystemArchive(searchQuery, {
      category: selectedCategory,
      allowMangaSpoilers,
    });
  }, [searchQuery, selectedCategory, allowMangaSpoilers]);

  if (!isOpen) return null;

  const handleItemClick = (item: GlobalSearchResult) => {
    sound.playSystemPing();
    if (item.category === 'Character') {
      setSelectedCharacter(item.item as Character);
    } else if (item.category === 'Gate') {
      setSelectedGate(item.item as Gate);
    } else if (item.category === 'Shadow') {
      setViewingShadow(item.item as Shadow);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#03040A]/90 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-5xl h-[85vh] bg-[#0B1020] system-border rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-[#1A1F38]">
          {/* Top Archive Command Bar */}
          <div className="p-6 border-b border-[#1A1F38] bg-[#070B14] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#11182B] border border-[#39A7FF]/40">
                <Database className="w-5 h-5 text-[#39A7FF]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wider">
                    SYSTEM ARCHIVE COMMAND
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono-tech text-emerald-400 font-bold">
                    CANON CERTIFIED
                  </span>
                </div>
                <p className="text-xs font-mono-tech text-[#B8C7FF]/50">
                  OFFICIAL SOLO LEVELING ANIME DATABASE & CHRONOLOGY
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Spoiler Control Toggle */}
              <div className="flex items-center gap-2 text-xs font-mono-tech">
                <span className="text-[#B8C7FF]/60">SPOILERS:</span>
                <button
                  onClick={() => {
                    sound.playSystemPing();
                    setAllowMangaSpoilers((prev) => !prev);
                  }}
                  className={`px-3 py-1 rounded text-[11px] font-mono-tech font-bold uppercase transition-all ${
                    allowMangaSpoilers
                      ? 'bg-amber-950 border border-amber-500 text-amber-400'
                      : 'bg-[#11182B] border border-[#39A7FF]/40 text-[#39A7FF]'
                  }`}
                >
                  {allowMangaSpoilers ? 'MANGA EXPANDED' : 'ANIME ONLY (DEFAULT)'}
                </button>
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
          </div>

          {/* Search Input Bar */}
          <div className="p-4 sm:px-6 bg-[#070B14]/70 border-b border-[#1A1F38] flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#39A7FF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hunters, shadows, gates, dungeons, monsters, guilds, episodes..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#03040A] border border-[#1A1F38] focus:border-[#39A7FF] rounded-lg text-sm font-mono-tech text-white outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playSystemPing();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#11182B] border border-[#39A7FF] text-white shadow-[0_0_10px_rgba(57,167,255,0.25)]'
                      : 'bg-[#03040A] border border-[#1A1F38] text-[#B8C7FF]/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Results Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {/* If no active search, show archive dashboard overview cards */}
            {!searchQuery && selectedCategory === 'ALL' ? (
              <div className="space-y-6">
                {/* Canon Ranking Rule Notice */}
                <div className="p-4 rounded-xl bg-[#070B14] border border-[#5B4BFF]/40 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#39A7FF] shrink-0 mt-0.5" />
                  <div className="text-xs font-mono-tech text-[#F4F7FF]/85 leading-relaxed">
                    <span className="text-[#39A7FF] font-bold block mb-1 uppercase tracking-wider">
                      {CANON_RANK_SYSTEM_EXPLANATION.title}
                    </span>
                    {CANON_RANK_SYSTEM_EXPLANATION.summary}{' '}
                    <span className="text-[#B8C7FF] font-semibold">{CANON_RANK_SYSTEM_EXPLANATION.exception}</span>
                  </div>
                </div>

                {/* Database Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38]">
                    <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase">CHARACTERS</div>
                    <div className="text-2xl font-bold font-cinzel text-white mt-1">{CHARACTERS.length} REGISTERED</div>
                    <div className="text-[11px] font-mono-tech text-[#39A7FF] mt-1">S-Rank & Association Pillars</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38]">
                    <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase">SHADOW CORPS</div>
                    <div className="text-2xl font-bold font-cinzel text-white mt-1">{SHADOWS.length} SOVEREIGN UNITS</div>
                    <div className="text-[11px] font-mono-tech text-[#6C63FF] mt-1">Igris, Beru, Iron, Tank, Kaisel, Kiba</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38]">
                    <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase">GATES & DUNGEONS</div>
                    <div className="text-2xl font-bold font-cinzel text-white mt-1">{GATES.length} GATES · {DUNGEONS.length} DUNGEONS</div>
                    <div className="text-[11px] font-mono-tech text-rose-400 mt-1">Standard, Red Gates, Double Dungeon</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38]">
                    <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase">ANIMATED CHRONICLES</div>
                    <div className="text-2xl font-bold font-cinzel text-white mt-1">{EPISODES.length} EPISODES</div>
                    <div className="text-[11px] font-mono-tech text-emerald-400 mt-1">Seasons 1 & 2 Arise From The Shadow</div>
                  </div>
                </div>

                {/* Hunter Rank Canon Table */}
                <div>
                  <h4 className="text-xs font-mono-tech text-[#39A7FF] uppercase tracking-widest mb-3 font-bold">
                    HUNTER CLASSIFICATION STANDARDS (ASSOCIATION REGISTRY)
                  </h4>
                  <div className="space-y-2">
                    {HUNTER_RANKS.map((r) => (
                      <div
                        key={r.rank}
                        className="p-3.5 rounded-xl bg-[#070B14] border border-[#1A1F38] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-tech"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-16 px-2.5 py-1 text-center font-bold font-cinzel rounded bg-[#11182B] text-[#39A7FF] border border-[#1A1F38]">
                            {r.rank}
                          </span>
                          <div>
                            <span className="font-bold text-white block">{r.classification}</span>
                            <span className="text-[#B8C7FF]/60">{r.description}</span>
                          </div>
                        </div>
                        <div className="text-[#B8C7FF]/50 sm:text-right shrink-0">
                          {r.manaMeasurement}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Search Results Track */
              <div className="space-y-3">
                <div className="text-xs font-mono-tech text-[#B8C7FF]/60 pb-1">
                  MATCHING RECORDS: <span className="text-[#39A7FF] font-bold">{searchResults.length}</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-12 text-center text-xs font-mono-tech text-[#B8C7FF]/40">
                    No verified canon records matched your query. Check spelling or switch category.
                  </div>
                ) : (
                  searchResults.map((res) => (
                    <div
                      key={`${res.category}-${res.id}`}
                      onClick={() => handleItemClick(res)}
                      className="p-4 rounded-xl bg-[#070B14] border border-[#1A1F38] hover:border-[#39A7FF]/60 hover:bg-[#11182B] cursor-pointer transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech uppercase font-bold bg-[#11182B] text-[#39A7FF] border border-[#39A7FF]/30">
                            {res.category}
                          </span>
                          {res.badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech uppercase bg-[#03040A] text-white/70 border border-[#1A1F38]">
                              {res.badge}
                            </span>
                          )}
                          <h4 className="font-cinzel text-base font-bold text-white">{res.title}</h4>
                        </div>
                        <div className="text-xs font-mono-tech text-[#B8C7FF]/70">{res.subtitle}</div>
                        <p className="text-xs font-mono-tech text-[#B8C7FF]/50 line-clamp-2 max-w-3xl">
                          {res.description}
                        </p>
                      </div>

                      <button className="self-end sm:self-center px-3 py-1.5 rounded bg-[#11182B] hover:bg-[#1A1F38] text-xs font-mono-tech text-[#39A7FF] tracking-wider uppercase border border-[#39A7FF]/40 shrink-0">
                        VIEW RECORD
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Modals for Detail Inspection */}
      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />

      <GateDetailModal
        gate={selectedGate}
        onClose={() => setSelectedGate(null)}
      />

      {/* Shadow Simple Inspection Modal */}
      {viewingShadow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03040A]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0B1020] system-border rounded-2xl p-6 border border-[#1A1F38] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1A1F38] pb-4">
              <div>
                <span className="text-[10px] font-mono-tech text-[#6C63FF] uppercase font-bold tracking-widest block">
                  SHADOW ARMY COMMANDER
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white">{viewingShadow.name}</h3>
              </div>
              <button
                onClick={() => setViewingShadow(null)}
                className="p-2 rounded bg-[#11182B] text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs font-mono-tech text-[#B8C7FF]/70 space-y-1">
              <div><span className="text-white font-bold">FORMER IDENTITY:</span> {viewingShadow.originalName}</div>
              <div><span className="text-white font-bold">GRADE / RANK:</span> {viewingShadow.rank || viewingShadow.type}</div>
              {viewingShadow.weapon && <div><span className="text-white font-bold">WEAPON:</span> {viewingShadow.weapon}</div>}
              <div><span className="text-white font-bold">FIRST SUMMON:</span> {viewingShadow.firstAppearance}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#070B14] border border-[#1A1F38] text-xs font-mono-tech text-[#F4F7FF]/80">
              <span className="text-[#39A7FF] font-bold block mb-1">ORIGIN OF EXTRACTION</span>
              {viewingShadow.origin}
            </div>

            <div>
              <span className="text-[10px] font-mono-tech text-[#39A7FF] uppercase font-bold block mb-1">
                VERIFIED ABILITIES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {viewingShadow.abilities.map((ab, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#11182B] text-[11px] font-mono-tech text-white/80">
                    {ab}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono-tech text-[#B8C7FF]/40 border-t border-[#1A1F38] flex justify-between">
              <span>SOURCE: {viewingShadow.sourceCitation}</span>
              <span className="text-emerald-400">VERIFIED CANON</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
