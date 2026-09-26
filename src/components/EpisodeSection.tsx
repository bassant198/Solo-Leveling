import React, { useState } from 'react';
import { EPISODES, STORY_ARCS } from '../data';
import { Episode, StoryArc } from '../types/canon';
import { Play, Tv, ChevronDown, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

export const EpisodeSection: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<1 | 2>(1);
  const [activeView, setActiveView] = useState<'episodes' | 'arcs'>('episodes');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const episodes = EPISODES.filter((ep) => ep.season === activeSeason);
  const arcs = STORY_ARCS.filter((arc) => arc.season === activeSeason);

  const toggleExpand = (id: number) => {
    sound.playSystemPing();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="episodes" className="relative min-h-screen py-24 px-6 bg-[#070B14] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#5B4BFF]/8 blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#1A1F38] pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono-tech tracking-[0.3em] text-[#39A7FF] uppercase">
              <Tv className="w-4 h-4 text-[#39A7FF]" />
              <span>OFFICIAL BROADCAST CHRONOLOGY // VERIFIED CANON</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[0.15em] text-white">
              ANIMATED CHRONICLES
            </h2>
          </div>

          {/* Controls: Season Toggle & View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode */}
            <div className="flex items-center p-1 bg-[#03040A] border border-[#1A1F38] rounded-lg text-xs font-mono-tech">
              <button
                onClick={() => {
                  sound.playSystemPing();
                  setActiveView('episodes');
                }}
                className={`px-3 py-1.5 rounded transition-all ${
                  activeView === 'episodes'
                    ? 'bg-[#11182B] text-white font-bold border border-[#39A7FF]/40'
                    : 'text-[#B8C7FF]/50 hover:text-white'
                }`}
              >
                EPISODES
              </button>
              <button
                onClick={() => {
                  sound.playSystemPing();
                  setActiveView('arcs');
                }}
                className={`px-3 py-1.5 rounded transition-all ${
                  activeView === 'arcs'
                    ? 'bg-[#11182B] text-white font-bold border border-[#39A7FF]/40'
                    : 'text-[#B8C7FF]/50 hover:text-white'
                }`}
              >
                STORY ARCS
              </button>
            </div>

            {/* Season Segmented Control */}
            <div className="flex items-center p-1 bg-[#03040A] border border-[#1A1F38] rounded-lg">
              <button
                onClick={() => {
                  setActiveSeason(1);
                  sound.playSystemPing();
                }}
                className={`px-4 py-1.5 text-xs font-mono-tech tracking-widest uppercase rounded-md transition-all ${
                  activeSeason === 1
                    ? 'bg-[#11182B] text-white border border-[#39A7FF]/50 shadow-[0_0_12px_rgba(57,167,255,0.25)]'
                    : 'text-[#B8C7FF]/50 hover:text-white'
                }`}
              >
                SEASON 01
              </button>
              <button
                onClick={() => {
                  setActiveSeason(2);
                  sound.playSystemPing();
                }}
                className={`px-4 py-1.5 text-xs font-mono-tech tracking-widest uppercase rounded-md transition-all ${
                  activeSeason === 2
                    ? 'bg-[#11182B] text-white border border-[#39A7FF]/50 shadow-[0_0_12px_rgba(57,167,255,0.25)]'
                    : 'text-[#B8C7FF]/50 hover:text-white'
                }`}
              >
                SEASON 02 · ARISE
              </button>
            </div>
          </div>
        </div>

        {/* View Content */}
        {activeView === 'episodes' ? (
          /* Episode Accordion Cards */
          <div className="space-y-4">
            {episodes.map((ep) => {
              const isExpanded = expandedId === ep.id;

              return (
                <div
                  key={ep.id}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#0B1020] border-[#39A7FF]/60 shadow-[0_0_20px_rgba(57,167,255,0.15)]'
                      : 'bg-[#070B14]/80 border-[#1A1F38] hover:border-[#5B4BFF]/40 hover:bg-[#0B1020]'
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(ep.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-[#03040A] border border-[#1A1F38] shrink-0 font-mono-tech">
                        <span className="text-[10px] text-[#B8C7FF]/50 uppercase">EP</span>
                        <span className="text-base font-bold text-white tabular-nums">
                          {ep.episodeNumber < 10 ? `0${ep.episodeNumber}` : ep.episodeNumber}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                            {ep.title}
                          </h4>
                          <span className="text-xs font-mono-tech text-[#B8C7FF]/40 hidden sm:inline">
                            {ep.japaneseTitle}
                          </span>
                        </div>
                        <div className="text-xs font-mono-tech text-[#39A7FF] mt-0.5">
                          {ep.airDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={`w-5 h-5 text-[#39A7FF] transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-[#1A1F38]/60 space-y-4">
                      <p className="text-sm text-[#B8C7FF]/85 leading-relaxed font-mono-tech">
                        {ep.description}
                      </p>

                      {/* Key Canonical Events */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono-tech text-[#39A7FF] uppercase font-bold tracking-wider block">
                          CANONICAL KEY EVENTS
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ep.keyEvents.map((evt, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded bg-[#03040A] border border-[#1A1F38] text-xs font-mono-tech text-white/90 flex items-start gap-2"
                            >
                              <span className="text-[#39A7FF] mt-0.5">●</span>
                              <span>{evt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Episode Meta Tags */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono-tech text-[#B8C7FF]/50 border-t border-[#1A1F38]">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#39A7FF]" />
                          <span>SOURCE: {ep.sourceCitation}</span>
                        </div>
                        <div className="text-emerald-400 font-bold">
                          CANONICAL BROADCAST RECORD
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Story Arcs Cards */
          <div className="space-y-4">
            {arcs.map((arc) => (
              <div
                key={arc.id}
                className="p-6 rounded-xl bg-[#0B1020] border border-[#1A1F38] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1F38] pb-3">
                  <h4 className="font-cinzel text-xl font-bold text-white">{arc.name}</h4>
                  <div className="text-xs font-mono-tech text-[#39A7FF]">
                    EPISODES {arc.episodes.join(', ')} · SEASON 0{arc.season}
                  </div>
                </div>

                <p className="text-xs font-mono-tech text-[#B8C7FF]/80 leading-relaxed">
                  {arc.summary}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono-tech">
                  <div className="p-2.5 rounded bg-[#03040A] border border-[#1A1F38]">
                    <span className="text-[#B8C7FF]/50 uppercase text-[10px] block">MAIN CHARACTERS</span>
                    <span className="text-white mt-0.5 block truncate">{arc.mainCharacters.join(', ')}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#03040A] border border-[#1A1F38]">
                    <span className="text-[#B8C7FF]/50 uppercase text-[10px] block">PRIMARY BOSSES</span>
                    <span className="text-rose-400 mt-0.5 block truncate">{arc.bosses.join(', ')}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#03040A] border border-[#1A1F38]">
                    <span className="text-[#B8C7FF]/50 uppercase text-[10px] block">SOURCE</span>
                    <span className="text-[#39A7FF] mt-0.5 block truncate">{arc.sourceCitation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
