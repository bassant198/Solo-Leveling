import { RankInfo } from '../types/canon';

export const HUNTER_RANKS: RankInfo[] = [
  {
    rank: 'E',
    classification: 'Lowest Awakened Category',
    manaMeasurement: 'Slightly above ordinary human (~10-20 MP)',
    description: 'Awakened individuals with marginally higher durability or senses than ordinary people. Frequently suffer injuries against even low-tier beasts like goblins.',
    combatRole: 'Support, porter work, mining crystals in cleared dungeons, or low-risk raid scouting.',
    progressionRule: 'Cannot be raised through physical workouts or normal training. Bound permanently to this rank unless an exceptionally rare reawakening occurs.',
  },
  {
    rank: 'D',
    classification: 'Novice Hunter',
    manaMeasurement: 'Measurable low-tier mana reserve',
    description: 'Capable of handling basic melee beasts and lesser stone beasts. Forms the backbone of standard daily clearance raids.',
    combatRole: 'Frontline vanguard for D-Rank and E-Rank dungeons.',
    progressionRule: 'Fixed at awakening. Physical power is capped by the initial mana capacity.',
  },
  {
    rank: 'C',
    classification: 'Intermediate Combatant',
    manaMeasurement: 'Substantial mana density',
    description: 'Seasoned hunters capable of utilizing basic elemental or physical aura skills. Form legitimate strike teams.',
    combatRole: 'Strike squad leader for C-Rank dungeons or core members of large B-Rank raids.',
    progressionRule: 'Fixed. Training sharpens technique and tactics, but the ceiling of magic energy remains unchanged.',
  },
  {
    rank: 'B',
    classification: 'Upper Combatant',
    manaMeasurement: 'High-density mana output',
    description: 'Elite hunters possessing devastating combat abilities. Highly valued by major guilds for dungeon clearance efficiency.',
    combatRole: 'Main attack force for high-tier guild expeditions.',
    progressionRule: 'Static upon awakening. Mana output is immutable.',
  },
  {
    rank: 'A',
    classification: 'Elite Vanguard / Deputy Class',
    manaMeasurement: 'Exceptional destructive energy',
    description: 'Extremely scarce individuals capable of solo-clearing mid-tier dungeons. Form the executive command structure of major guilds.',
    combatRole: 'Raid leaders, guild vice-masters, and key defense pillars in emergency gate outbreaks.',
    progressionRule: 'Fixed. Only a secondary awakening can alter their mana rating.',
  },
  {
    rank: 'S',
    classification: 'Cataclysmic / Nation-Defending Hunter',
    manaMeasurement: 'Immeasurable by standard mana measurement devices (Overflow)',
    description: 'Beings whose power cannot be gauged on normal scales. South Korea possessed only 10 registered S-Rank hunters in modern history.',
    combatRole: 'National strategic defense assets. Sole individuals authorized to challenge S-Rank gates and high-tier red gates.',
    progressionRule: 'Supreme tier. Fixed at awakening. Sung Jin-Woo is the sole documented exception in modern history due to the System granting continuous leveling.',
  },
  {
    rank: 'National Level',
    classification: 'Global Strategic Deterrent (Ruler\'s Vessel)',
    manaMeasurement: 'Planetary-scale Authority',
    description: 'Special distinction granted to the five surviving hunters who cleared the disastrous first S-Rank Gate (Kamish Raid). Granted legal standing equal to sovereign nations.',
    combatRole: 'Global defense against apocalyptic threats.',
    progressionRule: 'Endowed with direct fragments of primordial Ruler authority.',
  },
];

export const CANON_RANK_SYSTEM_EXPLANATION = {
  title: 'The Law of Awakened Mana',
  summary: 'In the Solo Leveling universe, when a human undergoes an Awakening, their magic power capacity is permanently locked at that moment. Neither intense gym training, dungeon combat, nor meditation can increase a hunter\'s core mana pool.',
  exception: 'Sung Jin-Woo is the sole documented anomaly across all humanity. Chosen as the Player of the System after the Double Dungeon sacrificial trial, he possesses a unique RPG-like progression interface allowing him to level up, allocate stat points, and transcend the biological limitations of ordinary hunters.',
  source: 'Official Solo Leveling Anime Introduction & Association Records',
};
