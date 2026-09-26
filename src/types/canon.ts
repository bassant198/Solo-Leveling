export type CanonSource = 'ANIME' | 'MANGA';
export type SpoilerLevel = 'SEASON_1' | 'SEASON_2' | 'MANGA_SPOILER';

export interface SourceMetadata {
  source: string;
  canonSource: CanonSource;
  verified: boolean;
  notes?: string;
}

export interface Character {
  id: string;
  name: string;
  koreanName?: string;
  englishName?: string;
  japaneseName?: string;
  role: string;
  rank: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank' | 'National Level' | 'Non-Hunter' | 'Unknown' | (string & {});
  hunterClass?: string;
  guild?: string;
  nationality?: string;
  occupation?: string;
  abilities?: string[];
  skills?: string[];
  relationships?: { name: string; relation: string }[];
  firstAppearance?: string;
  seasonAppearances?: (1 | 2)[];
  description: string;
  systemUser?: boolean;
  status: 'Alive' | 'Deceased' | 'Extracted as Shadow' | 'Unknown' | (string & {});
  voiceActor?: { japanese?: string; english?: string };
  image?: string;
  canonSource: CanonSource;
  spoilerLevel: SpoilerLevel;
  sourceCitation: string;
}

export interface Shadow {
  id: string;
  name: string;
  originalName: string;
  type: string;
  rank?: string;
  abilities: string[];
  weapon?: string;
  origin: string;
  firstAppearance: string;
  appearances?: string[];
  status: 'Active Shadow' | 'Deceased' | 'Released';
  image?: string;
  canonSource: CanonSource;
  spoilerLevel: SpoilerLevel;
  sourceCitation: string;
}

export interface Gate {
  id: string;
  name: string;
  type: 'STANDARD' | 'RED_GATE' | 'DOUBLE_DUNGEON' | 'SPECIAL_CASE';
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SPECIAL';
  location: string;
  appearance: string;
  visualDescription: string;
  environment: string;
  monsters: string[];
  boss: string;
  specialProperties: string[];
  dangerLevel: 'Minimal' | 'Moderate' | 'Severe' | 'High' | 'Catastrophic' | 'EXTREME';
  episodeAppearance: string;
  storyArc: string;
  status: 'Cleared' | 'Active' | 'Breached';
  image?: string;
  canonSource: CanonSource;
  spoilerLevel: SpoilerLevel;
  sourceCitation: string;
}

export interface Dungeon {
  id: string;
  name: string;
  gateType: string;
  rank: string;
  location: string;
  environment: string;
  monsters: string[];
  boss: string;
  arc: string;
  episodes: string;
  description: string;
  image?: string;
  canonSource: CanonSource;
  sourceCitation: string;
}

export interface Monster {
  id: string;
  name: string;
  type: string;
  rank: string;
  abilities: string[];
  environment: string;
  firstAppearance: string;
  associatedDungeon: string;
  boss: boolean;
  description: string;
  image?: string;
  canonSource: CanonSource;
  sourceCitation: string;
}

export interface Guild {
  id: string;
  name: string;
  country: string;
  guildMaster: string;
  viceGuildMaster?: string;
  prominentMembers: string[];
  specialization: string;
  firstAppearance: string;
  description: string;
  canonSource: CanonSource;
  sourceCitation: string;
}

export interface RankInfo {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National Level';
  classification: string;
  manaMeasurement: string;
  description: string;
  combatRole: string;
  progressionRule: string;
}

export interface Episode {
  id: number;
  season: 1 | 2;
  episodeNumber: number;
  title: string;
  japaneseTitle: string;
  description: string;
  keyEvents: string[];
  characters: string[];
  locations: string[];
  gates?: string[];
  monsters?: string[];
  boss?: string;
  spoilerLevel: SpoilerLevel;
  airDate: string;
  sourceCitation: string;
}

export interface StoryArc {
  id: string;
  name: string;
  season: 1 | 2;
  episodes: number[];
  mainCharacters: string[];
  locations: string[];
  gates: string[];
  dungeons: string[];
  bosses: string[];
  summary: string;
  spoilerLevel: SpoilerLevel;
  sourceCitation: string;
}
