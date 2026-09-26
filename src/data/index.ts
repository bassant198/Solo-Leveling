import { CHARACTERS } from './characters';
import { SHADOWS } from './shadows';
import { GATES } from './gates';
import { DUNGEONS } from './dungeons';
import { MONSTERS } from './monsters';
import { GUILDS } from './guilds';
import { HUNTER_RANKS, CANON_RANK_SYSTEM_EXPLANATION } from './ranks';
import { EPISODES } from './episodes';
import { STORY_ARCS } from './arcs';

export * from './characters';
export * from './shadows';
export * from './gates';
export * from './dungeons';
export * from './monsters';
export * from './guilds';
export * from './ranks';
export * from './episodes';
export * from './arcs';

export interface GlobalSearchResult {
  category: 'Character' | 'Shadow' | 'Gate' | 'Dungeon' | 'Monster' | 'Guild' | 'Episode' | 'Arc';
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  item: unknown;
}

export function searchSystemArchive(
  query: string,
  options?: {
    allowMangaSpoilers?: boolean;
    category?: string;
  }
): GlobalSearchResult[] {
  const q = query.trim().toLowerCase();
  const allowManga = options?.allowMangaSpoilers ?? false;
  const targetCategory = options?.category ?? 'ALL';
  const results: GlobalSearchResult[] = [];

  if (!q && targetCategory === 'ALL') {
    return results;
  }

  // 1. Characters
  if (targetCategory === 'ALL' || targetCategory === 'Characters') {
    for (const char of CHARACTERS) {
      if (!allowManga && char.spoilerLevel === 'MANGA_SPOILER') continue;
      const match =
        !q ||
        char.name.toLowerCase().includes(q) ||
        char.role.toLowerCase().includes(q) ||
        char.rank.toLowerCase().includes(q) ||
        (char.guild && char.guild.toLowerCase().includes(q)) ||
        (char.englishName && char.englishName.toLowerCase().includes(q)) ||
        (char.japaneseName && char.japaneseName.toLowerCase().includes(q)) ||
        (char.koreanName && char.koreanName.toLowerCase().includes(q));

      if (match) {
        results.push({
          category: 'Character',
          id: char.id,
          title: char.name,
          subtitle: `${char.rank} · ${char.role}`,
          badge: char.rank,
          description: char.description,
          item: char,
        });
      }
    }
  }

  // 2. Shadows
  if (targetCategory === 'ALL' || targetCategory === 'Shadows') {
    for (const shadow of SHADOWS) {
      if (!allowManga && shadow.spoilerLevel === 'MANGA_SPOILER') continue;
      const match =
        !q ||
        shadow.name.toLowerCase().includes(q) ||
        shadow.originalName.toLowerCase().includes(q) ||
        shadow.type.toLowerCase().includes(q) ||
        (shadow.rank && shadow.rank.toLowerCase().includes(q));

      if (match) {
        results.push({
          category: 'Shadow',
          id: shadow.id,
          title: shadow.name,
          subtitle: `Original: ${shadow.originalName}`,
          badge: shadow.rank || shadow.type,
          description: shadow.origin,
          item: shadow,
        });
      }
    }
  }

  // 3. Gates
  if (targetCategory === 'ALL' || targetCategory === 'Gates') {
    for (const gate of GATES) {
      if (!allowManga && gate.spoilerLevel === 'MANGA_SPOILER') continue;
      const match =
        !q ||
        gate.name.toLowerCase().includes(q) ||
        gate.type.toLowerCase().includes(q) ||
        gate.rank.toLowerCase().includes(q) ||
        gate.location.toLowerCase().includes(q) ||
        gate.boss.toLowerCase().includes(q);

      if (match) {
        results.push({
          category: 'Gate',
          id: gate.id,
          title: gate.name,
          subtitle: `${gate.rank}-Rank ${gate.type.replace('_', ' ')} · ${gate.location}`,
          badge: `${gate.rank}-RANK`,
          description: gate.visualDescription,
          item: gate,
        });
      }
    }
  }

  // 4. Dungeons
  if (targetCategory === 'ALL' || targetCategory === 'Dungeons') {
    for (const dun of DUNGEONS) {
      const match =
        !q ||
        dun.name.toLowerCase().includes(q) ||
        dun.rank.toLowerCase().includes(q) ||
        dun.boss.toLowerCase().includes(q) ||
        dun.arc.toLowerCase().includes(q);

      if (match) {
        results.push({
          category: 'Dungeon',
          id: dun.id,
          title: dun.name,
          subtitle: `${dun.rank} · ${dun.arc}`,
          badge: dun.rank,
          description: dun.description,
          item: dun,
        });
      }
    }
  }

  // 5. Monsters
  if (targetCategory === 'ALL' || targetCategory === 'Monsters') {
    for (const mon of MONSTERS) {
      const match =
        !q ||
        mon.name.toLowerCase().includes(q) ||
        mon.type.toLowerCase().includes(q) ||
        mon.rank.toLowerCase().includes(q) ||
        mon.associatedDungeon.toLowerCase().includes(q);

      if (match) {
        results.push({
          category: 'Monster',
          id: mon.id,
          title: mon.name,
          subtitle: `${mon.rank} · ${mon.type}`,
          badge: mon.boss ? 'BOSS' : mon.rank,
          description: mon.description,
          item: mon,
        });
      }
    }
  }

  // 6. Guilds
  if (targetCategory === 'ALL' || targetCategory === 'Guilds') {
    for (const guild of GUILDS) {
      const match =
        !q ||
        guild.name.toLowerCase().includes(q) ||
        guild.guildMaster.toLowerCase().includes(q) ||
        guild.country.toLowerCase().includes(q);

      if (match) {
        results.push({
          category: 'Guild',
          id: guild.id,
          title: guild.name,
          subtitle: `Master: ${guild.guildMaster} (${guild.country})`,
          badge: guild.country,
          description: guild.description,
          item: guild,
        });
      }
    }
  }

  // 7. Episodes
  if (targetCategory === 'ALL' || targetCategory === 'Episodes') {
    for (const ep of EPISODES) {
      const match =
        !q ||
        ep.title.toLowerCase().includes(q) ||
        ep.japaneseTitle.toLowerCase().includes(q) ||
        ep.description.toLowerCase().includes(q) ||
        `episode ${ep.episodeNumber}`.includes(q);

      if (match) {
        results.push({
          category: 'Episode',
          id: `ep-${ep.season}-${ep.episodeNumber}`,
          title: `S${ep.season} E${ep.episodeNumber}: ${ep.title}`,
          subtitle: ep.japaneseTitle,
          badge: `SEASON 0${ep.season}`,
          description: ep.description,
          item: ep,
        });
      }
    }
  }

  return results.slice(0, 30);
}
