import React from 'react';
import { Character } from '../types/canon';
import { X, Shield, Award, Sparkles, User, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#03040A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0B1020] system-border rounded-2xl overflow-hidden shadow-2xl my-8 border border-[#1A1F38]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1F38] bg-[#070B14]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39A7FF] shadow-[0_0_8px_#39A7FF]" />
            <span className="font-mono-tech text-xs tracking-[0.25em] text-[#39A7FF] uppercase">
              SYSTEM ARCHIVE // HUNTER RECORD #{character.id.toUpperCase()}
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
          {/* Main Identity Lockup */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded bg-[#11182B] border border-[#39A7FF]/40 text-xs font-mono-tech text-[#39A7FF] font-bold tracking-wider uppercase">
                  {character.rank}
                </span>
                {character.systemUser && (
                  <span className="px-2.5 py-1 rounded bg-[#5B4BFF]/20 border border-[#5B4BFF]/50 text-xs font-mono-tech text-[#B8C7FF] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#39A7FF]" />
                    <span>SYSTEM PLAYER</span>
                  </span>
                )}
                <span className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>VERIFIED CANON</span>
                </span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white tracking-wide">
                {character.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs font-mono-tech text-[#B8C7FF]/70">
                {character.koreanName && <span>KR: {character.koreanName}</span>}
                {character.japaneseName && <span>· JP: {character.japaneseName}</span>}
                {character.nationality && <span>· {character.nationality}</span>}
              </div>
            </div>

            {character.image && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#070B14] border border-[#1A1F38] shrink-0">
                <img
                  src={character.image}
                  alt={character.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#070B14] border border-[#1A1F38] text-xs font-mono-tech">
            <div>
              <span className="text-[#B8C7FF]/50 uppercase block">ROLE</span>
              <span className="text-white font-semibold mt-0.5 block truncate">{character.role}</span>
            </div>
            <div>
              <span className="text-[#B8C7FF]/50 uppercase block">CLASS</span>
              <span className="text-white font-semibold mt-0.5 block truncate">{character.hunterClass || 'Not Specified'}</span>
            </div>
            <div>
              <span className="text-[#B8C7FF]/50 uppercase block">GUILD AFFILIATION</span>
              <span className="text-[#39A7FF] font-semibold mt-0.5 block truncate">{character.guild || 'Independent / None'}</span>
            </div>
            <div>
              <span className="text-[#B8C7FF]/50 uppercase block">CURRENT STATUS</span>
              <span className="text-emerald-400 font-semibold mt-0.5 block truncate">{character.status}</span>
            </div>
          </div>

          {/* Canonical Description */}
          <div>
            <h4 className="text-xs font-mono-tech text-[#39A7FF] tracking-widest uppercase mb-2">
              RECORD OVERVIEW
            </h4>
            <p className="text-sm text-[#F4F7FF]/85 leading-relaxed bg-[#070B14]/60 p-4 rounded-xl border border-[#1A1F38]">
              {character.description}
            </p>
          </div>

          {/* Abilities & Skills */}
          {character.abilities && character.abilities.length > 0 && (
            <div>
              <h4 className="text-xs font-mono-tech text-[#39A7FF] tracking-widest uppercase mb-2">
                VERIFIED CANONICAL ABILITIES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {character.abilities.map((ab, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#070B14] border border-[#1A1F38] text-xs font-mono-tech text-[#F4F7FF]/90 flex items-start gap-2"
                  >
                    <span className="text-[#39A7FF] mt-0.5">●</span>
                    <span>{ab}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relationships */}
          {character.relationships && character.relationships.length > 0 && (
            <div>
              <h4 className="text-xs font-mono-tech text-[#39A7FF] tracking-widest uppercase mb-2">
                KNOWN RELATIONSHIPS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {character.relationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#070B14] border border-[#1A1F38] text-xs font-mono-tech"
                  >
                    <span className="font-bold text-white">{rel.name}:</span>{' '}
                    <span className="text-[#B8C7FF]/70">{rel.relation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voice Cast & First Appearance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono-tech text-[#B8C7FF]/70">
            {character.voiceActor && (
              <div className="p-3 rounded-lg bg-[#070B14] border border-[#1A1F38]">
                <span className="text-[#39A7FF] uppercase font-bold block mb-1">VOICE ACTORS</span>
                {character.voiceActor.japanese && <div>JP: {character.voiceActor.japanese}</div>}
                {character.voiceActor.english && <div>EN: {character.voiceActor.english}</div>}
              </div>
            )}
            <div className="p-3 rounded-lg bg-[#070B14] border border-[#1A1F38]">
              <span className="text-[#39A7FF] uppercase font-bold block mb-1">FIRST APPEARANCE</span>
              <div>{character.firstAppearance || 'Not Specified'}</div>
              <div className="text-[11px] text-[#B8C7FF]/50 mt-1">
                Seasons: {character.seasonAppearances?.map((s) => `Season ${s}`).join(', ') || 'Season 1'}
              </div>
            </div>
          </div>

          {/* Source Verification Badge */}
          <div className="pt-4 border-t border-[#1A1F38] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono-tech text-[#B8C7FF]/60">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#39A7FF]" />
              <span>SOURCE: {character.sourceCitation}</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#11182B] border border-[#1A1F38] text-white/80 self-start sm:self-auto">
              CANON: {character.canonSource} ONLY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
