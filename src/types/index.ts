export interface HunterCharacter {
  id: string;
  name: string;
  koreanName?: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National Level';
  hunterClass: string;
  affiliation: string;
  primaryAbility: string;
  description: string;
  quote: string;
  stats: {
    combat: number;
    mana: number;
    agility: number;
    durability: number;
  };
  image?: string;
}

export interface ShadowSoldier {
  id: string;
  name: string;
  grade: 'Elite Knight' | 'Knight' | 'Commander' | 'Marshal' | 'General';
  formerIdentity: string;
  extractMethod: string;
  specialty: string;
  description: string;
  stats: {
    strength: number;
    agility: number;
    magic: number;
  };
  image?: string;
  signatureSkill: string;
}

export interface GateInfo {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  code: string;
  location: string;
  magicDensity: string;
  bossThreat: string;
  dangerLevel: 'Minimal' | 'Moderate' | 'Severe' | 'High' | 'Catastrophic' | 'EXTREME';
  description: string;
  recommendedTeam: string;
  specialPhenomenon?: string;
}

export interface QuestTask {
  id: string;
  title: string;
  target: number;
  unit: string;
  completed: boolean;
  current: number;
}

export interface UserHunterProfile {
  name: string;
  hunterClass: 'ASSASSIN' | 'MAGE' | 'TANK' | 'FIGHTER' | 'RANGER' | 'HEALER';
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National Level';
  level: number;
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  shadowsCommanded: number;
  awakeningDate: string;
  title: string;
}

export interface AnimeEpisode {
  id: number;
  season: 1 | 2;
  episodeNumber: number;
  title: string;
  japaneseTitle: string;
  synopsis: string;
  arc: string;
  airDate: string;
  highlight: string;
}
