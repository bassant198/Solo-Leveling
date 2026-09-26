import React, { useState, useRef } from 'react';
import { CHARACTERS } from '../data/characters';
import { Character } from '../types/canon';
import { CharacterDetailModal } from './CharacterDetailModal';
import { Shield, Sparkles, Sword, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { sound } from '../utils/audio';

export const CharacterGallery: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [activeRankFilter, setActiveRankFilter] = useState<string>('ALL');
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const filteredCharacters = activeRankFilter === 'ALL'
    ? CHARACTERS
    : CHARACTERS.filter((c) => c.rank === activeRankFilter);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSelect = (char: Character) => {
    setSelectedCharacter(char);
    sound.playSystemPing();
  };

  const ranksList = ['ALL', 'S-Rank', 'A-Rank', 'B-Rank', 'C-Rank', 'D-Rank', 'E-Rank', 'National Level'];

  return (
    <section id="characters" className="relative min-h-screen py-24 px-6 bg-[#03040A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#5B4BFF]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#39A7FF]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#1A1F38] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono-tech tracking-[0.3em] text-[#39A7FF] uppercase">
              <Sword className="w-4 h-4 text-[#39A7FF]" />
              <span>HUNTER REGISTRY ARCHIVE // CANON CERTIFIED</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.15em] text-white">
              CHARACTER DATABASE
            </h2>
          </div>
          <div className="text-xs font-mono-tech text-[#B8C7FF]/60 flex items-center gap-2">
            <span>OFFICIAL ROSTER:</span>
            <span className="text-[#39A7FF] font-bold">{CHARACTERS.length} VERIFIED HUNTERS</span>
          </div>
        </div>

        {/* Rank Filters Track */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <span className="text-xs font-mono-tech text-[#B8C7FF]/50 uppercase tracking-widest shrink-0 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#39A7FF]" />
            <span>FILTER RANK:</span>
          </span>
          {ranksList.map((rk) => (
            <button
              key={rk}
              onClick={() => {
                sound.playSystemPing();
                setActiveRankFilter(rk);
              }}
              className={`px-3 py-1 rounded text-xs font-mono-tech tracking-wider uppercase whitespace-nowrap transition-colors ${
                activeRankFilter === rk
                  ? 'bg-[#11182B] border border-[#39A7FF] text-white shadow-[0_0_10px_rgba(57,167,255,0.25)]'
                  : 'bg-[#070B14] border border-[#1A1F38] text-[#B8C7FF]/50 hover:text-white'
              }`}
            >
              {rk}
            </button>
          ))}
        </div>

        {/* Character Selector Horizontal Track */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none snap-x">
          {filteredCharacters.map((char) => {
            const isSelected = selectedCharacter.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => handleSelect(char)}
                className={`snap-start px-5 py-3 rounded-lg border text-left transition-all duration-300 whitespace-nowrap shrink-0 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#11182B] border-[#39A7FF] shadow-[0_0_20px_rgba(57,167,255,0.25)]'
                    : 'bg-[#070B14]/80 border-[#1A1F38] hover:border-[#5B4BFF]/50 hover:bg-[#0B1020]'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-[#39A7FF] shadow-[0_0_8px_#39A7FF]' : 'bg-[#1A1F38]'
                  }`}
                />
                <div>
                  <div className="text-xs font-bold text-white tracking-wider font-cinzel">
                    {char.name}
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#B8C7FF]/50 uppercase">
                    {char.rank} · {char.hunterClass ? char.hunterClass.split('/')[0] : char.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Cinematic Main Character Showcase Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Tilting Character Visual Frame (6 cols) */}
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#070B14] border border-[#1A1F38] shadow-2xl transition-transform duration-200 ease-out flex items-center justify-center p-6"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
          >
            {/* Background aura and dynamic gradient */}
            <div className="absolute inset-0 bg-radial from-[#5B4BFF]/20 via-[#070B14]/90 to-[#03040A]" />
            <div className="absolute inset-0 system-scanline pointer-events-none opacity-25" />

            {/* Character Visual Asset */}
            {selectedCharacter.image ? (
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-700"
              />
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#11182B] border border-[#5B4BFF]/40 flex items-center justify-center mb-4">
                  <Shield className="w-9 h-9 text-[#39A7FF]" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                  {selectedCharacter.name}
                </h4>
                <p className="text-xs font-mono-tech text-[#B8C7FF]/60 max-w-xs">
                  {selectedCharacter.role}
                </p>
              </div>
            )}

            {/* In-Frame Rank Insignia */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-[#03040A]/85 backdrop-blur-md border border-[#39A7FF]/40 text-xs font-mono-tech text-[#39A7FF] tracking-widest uppercase">
              {selectedCharacter.rank}
            </div>

            {selectedCharacter.koreanName && (
              <div className="absolute top-4 right-4 z-20 text-xs font-mono-tech text-[#B8C7FF]/50 tracking-widest">
                {selectedCharacter.koreanName}
              </div>
            )}
          </div>

          {/* Right Column: Character Lore & Tactical Profile Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tech tracking-[0.25em] text-[#39A7FF] uppercase mb-1">
                <span>AFFILIATION: {selectedCharacter.guild || 'INDEPENDENT / NONE'}</span>
                {selectedCharacter.systemUser && (
                  <span className="text-emerald-400">· [SYSTEM RECIPIENT]</span>
                )}
              </div>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
                {selectedCharacter.name}
              </h3>
              <div className="text-xs font-mono-tech text-[#6C63FF] mt-1 font-semibold tracking-wider uppercase">
                ROLE: {selectedCharacter.role}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#B8C7FF]/80 leading-relaxed font-normal bg-[#070B14]/60 p-4 rounded-xl border border-[#1A1F38]">
              {selectedCharacter.description}
            </p>

            {/* Canonical Abilities List */}
            {selectedCharacter.abilities && selectedCharacter.abilities.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono-tech text-[#39A7FF] uppercase tracking-wider block">
                  DOCUMENTED CANON ABILITIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCharacter.abilities.slice(0, 4).map((ab, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#0B1020] border border-[#1A1F38] text-xs font-mono-tech text-white/90"
                    >
                      {ab}
                    </span>
                  ))}
                  {selectedCharacter.abilities.length > 4 && (
                    <span className="px-2 py-1 rounded bg-[#11182B] text-xs font-mono-tech text-[#39A7FF]">
                      +{selectedCharacter.abilities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tactical Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono-tech">
              <div className="p-3 rounded bg-[#070B14] border border-[#1A1F38]">
                <div className="text-[10px] text-[#B8C7FF]/50 uppercase">STATUS</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedCharacter.status}</div>
              </div>
              <div className="p-3 rounded bg-[#070B14] border border-[#1A1F38]">
                <div className="text-[10px] text-[#B8C7FF]/50 uppercase">OCCUPATION</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate">{selectedCharacter.occupation || 'Hunter'}</div>
              </div>
              <div className="p-3 rounded bg-[#070B14] border border-[#1A1F38]">
                <div className="text-[10px] text-[#B8C7FF]/50 uppercase">CANON SOURCE</div>
                <div className="text-sm font-bold text-[#39A7FF] mt-0.5">{selectedCharacter.canonSource}</div>
              </div>
            </div>

            {/* Action Button: Inspect Detailed Canon Dossier */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playSystemPing();
                  setModalCharacter(selectedCharacter);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#11182B] hover:bg-[#1A1F38] border border-[#39A7FF]/50 hover:border-[#39A7FF] text-xs font-mono-tech text-white uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_15px_rgba(57,167,255,0.2)] flex items-center justify-center gap-2 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#39A7FF]" />
                <span>INSPECT FULL CANON DOSSIER</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Dossier Modal */}
      <CharacterDetailModal
        character={modalCharacter}
        onClose={() => setModalCharacter(null)}
      />
    </section>
  );
};
