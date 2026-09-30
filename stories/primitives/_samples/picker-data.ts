/* @layer stories @kind data */
import type { SelectGroup, SelectOption } from '../../../src/primitives';

type BuildStatus = 'done' | 'running' | 'failed' | 'queued';

interface Build {
  id: number;
  name: string;
  status: BuildStatus;
  branch: string;
  size?: number;
  finished?: string;
  notes: string;
}

interface Game {
  id: string;
  title: string;
  kind: 'adventure' | 'action' | 'puzzle' | 'handheld';
  year: number;
  platform: string;
}

interface Player {
  id: number;
  name: string;
  role: string;
  online: boolean;
}

const REGIONS: readonly string[] = [
  'Light World',
  'Dark World',
  'Hyrule Castle',
  'Eastern Palace',
  'Desert Palace',
  'Tower of Hera',
  'Palace of Darkness',
  'Swamp Palace',
];

const BUILDS: readonly Build[] = [
  {
    id: 101, name: 'alttp-randomizer', status: 'done', branch: 'main', size: 2_457_600, finished: '2026-09-28T14:20:00',
    notes: 'Seeds for the weekly race, with the new item pool and the open mode logic.',
  },
  { id: 102, name: 'links-awakening-dx', status: 'running', branch: 'feature/overworld', notes: 'Overworld map tiles, rebuilt after the palette change.' },
  {
    id: 103, name: 'super-metroid-map', status: 'failed', branch: 'fix/doors', size: 1_048_576, finished: '2026-09-27T09:05:00',
    notes: 'Door transitions fail in Maridia. The log points at the room header table.',
  },
  { id: 104, name: 'ocarina-tracker', status: 'queued', branch: 'main', notes: 'Waiting for a free runner.' },
  {
    id: 105, name: 'pokemon-red-seed', status: 'done', branch: 'release/1.4', size: 524_288, finished: '2026-09-26T18:42:00',
    notes: 'Release candidate for 1.4.',
  },
  {
    id: 106, name: 'metroid-fusion', status: 'failed', branch: 'main', size: 3_145_728, finished: '2026-09-25T11:30:00',
    notes: 'Out of space in bank 3 after the new sprites.',
  },
];

const GAMES: readonly Game[] = [
  { id: 'alttp', title: 'A Link to the Past', kind: 'adventure', year: 1991, platform: 'SNES' },
  { id: 'la', title: 'Link\'s Awakening', kind: 'handheld', year: 1993, platform: 'Game Boy' },
  { id: 'oot', title: 'Ocarina of Time', kind: 'adventure', year: 1998, platform: 'N64' },
  { id: 'sm', title: 'Super Metroid', kind: 'action', year: 1994, platform: 'SNES' },
  { id: 'mf', title: 'Metroid Fusion', kind: 'handheld', year: 2002, platform: 'Game Boy Advance' },
  { id: 'smw', title: 'Super Mario World', kind: 'action', year: 1990, platform: 'SNES' },
  { id: 'tetris', title: 'Tetris', kind: 'puzzle', year: 1989, platform: 'Game Boy' },
  { id: 'dr', title: 'Dr. Mario', kind: 'puzzle', year: 1990, platform: 'NES' },
  { id: 'poke', title: 'Pokemon Red', kind: 'handheld', year: 1996, platform: 'Game Boy' },
  { id: 'ff6', title: 'Final Fantasy VI', kind: 'adventure', year: 1994, platform: 'SNES' },
];

const PLAYERS: readonly Player[] = [
  { id: 1, name: 'Aria', role: 'Runner', online: true },
  { id: 2, name: 'Bram', role: 'Tracker', online: false },
  { id: 3, name: 'Cleo', role: 'Commentator', online: true },
  { id: 4, name: 'Dax', role: 'Runner', online: true },
  { id: 5, name: 'Esme', role: 'Organiser', online: false },
];

const REGION_OPTIONS: SelectOption[] = [
  { value: 'light', label: 'Light World', description: 'Overworld, 64 screens' },
  { value: 'dark', label: 'Dark World', description: 'Overworld, 64 screens' },
  { value: 'castle', label: 'Hyrule Castle' },
  { value: 'eastern', label: 'Eastern Palace' },
  { value: 'desert', label: 'Desert Palace' },
  { value: 'hera', label: 'Tower of Hera' },
];

const REGION_GROUPS: SelectGroup[] = [
  { label: 'Overworld', options: REGION_OPTIONS.slice(0, 2) },
  { label: 'Dungeons', options: REGION_OPTIONS.slice(2) },
];

export { BUILDS, GAMES, PLAYERS, REGION_GROUPS, REGION_OPTIONS, REGIONS };
export type { Build, Game, Player };
