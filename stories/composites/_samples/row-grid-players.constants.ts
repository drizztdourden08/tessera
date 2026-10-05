/* @layer stories @kind data */
import type { Player } from './row-grid-players.type';

const GAMES = [
  { value: 'alttp', label: 'A Link to the Past' },
  { value: 'timespinner', label: 'Timespinner' },
  { value: 'hollow', label: 'Hollow Knight' },
  { value: 'ori', label: 'Ori and the Blind Forest' },
  { value: 'sm', label: 'Super Metroid' },
] as const;

const PRESETS = [
  { value: 'default', label: 'Default' },
  { value: 'short', label: 'Short run' },
  { value: 'keysanity', label: 'Keysanity' },
  { value: 'file', label: 'Player file (yaml)' },
] as const;

const PLAYERS: readonly Player[] = [
  { id: 'p1', name: 'Ana', game: 'timespinner', preset: 'short', overrides: 2 },
  { id: 'p2', name: 'Bram', game: 'alttp', preset: 'keysanity', overrides: 0 },
  { id: 'p3', name: 'Cleo', game: 'hollow', preset: 'file', overrides: 0, file: 'Cleo_HK.yaml' },
];

const INVALID_PLAYERS: readonly Player[] = [
  { id: 'v1', name: 'Ana', game: 'timespinner', preset: 'short', overrides: 2 },
  { id: 'v2', name: 'Ana', game: 'alttp', preset: 'keysanity', overrides: 0 },
  { id: 'v3', name: '', game: '', preset: 'default', overrides: 0 },
];

const MANY_PLAYERS: readonly Player[] = [
  ...PLAYERS,
  { id: 'p4', name: 'Dax', game: 'ori', preset: 'default', overrides: 1 },
  { id: 'p5', name: 'Elle', game: 'sm', preset: 'short', overrides: 0 },
  { id: 'p6', name: 'Finn', game: 'alttp', preset: 'default', overrides: 4 },
];

const PLAYER_COLUMNS = {
  name: { min: 120, max: 260 },
  game: { min: 160, max: 300 },
  preset: { min: 160, max: 300 },
  overrides: { min: 168, max: 200 },
} as const;

export { GAMES, INVALID_PLAYERS, MANY_PLAYERS, PLAYER_COLUMNS, PLAYERS, PRESETS };
