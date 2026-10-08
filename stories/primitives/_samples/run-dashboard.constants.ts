/* @layer stories @kind data */
import type { GridSpan } from '../../../src/primitives';

const RUN_TEXT = {
  label: 'Randomizer run',
  summary: 'Summary',
  summarySub: 'Seed 48213, online',
  summaryLine: 'Profile Hyrule run, 3 players, started 20 minutes ago.',
  progress: 'Progress',
  progressLabel: 'Checks taken',
  activity: 'Recent activity',
  activityLines: ['Ganon Fan found the Hookshot.', 'Zelda sent the Moon Pearl.', 'Link reached Death Mountain.'],
  players: 'Players',
  pool: 'Item pool',
  poolLines: ['216 locations', '19 in logic now', 'Progressive items on'],
  settings: 'Settings',
  wide: 'wide',
  narrow: 'narrow, 512 px',
} as const;

const RUN_SPANS: Readonly<Record<'summary' | 'progress' | 'activity' | 'players' | 'pool' | 'settings', GridSpan>> = {
  summary: 1, progress: 1, activity: 1, players: 2, pool: 1, settings: 2,
};

const RUN_TILES = [
  { label: 'taken', value: '42 of 216' },
  { label: 'in logic', value: '19' },
  { label: 'left', value: '174' },
] as const;

const RUN_PLAYERS = [
  { label: 'Ganon Fan', value: '61 checks' },
  { label: 'Zelda', value: '48 checks' },
  { label: 'Link', value: '42 checks' },
] as const;

const RUN_SETTINGS = [
  { label: 'mode', value: 'Open' },
  { label: 'keysanity', value: 'Off' },
  { label: 'goal', value: 'Ganon' },
  { label: 'ocarina', value: 'Progressive' },
] as const;

export { RUN_PLAYERS, RUN_SETTINGS, RUN_SPANS, RUN_TEXT, RUN_TILES };
