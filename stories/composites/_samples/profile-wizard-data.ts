/* @layer stories @kind data */
import type { IconName } from '../../../src/primitives';

type ProfileMode = '' | 'standard' | 'local' | 'online';

type ProfileDraft = {
  name: string;
  rom: string;
  mode: ProfileMode;
  seed: string;
  server: string;
  slot: string;
  options: Readonly<Record<string, string>>;
  preset: string;
  language: string;
  msu: string;
};

type ModeCard = { value: Exclude<ProfileMode, ''>; label: string; description: string; icon: IconName };

type Choice = { value: string; label: string };

const GAMES: readonly Choice[] = [
  { value: 'alttp-us', label: 'A Link to the Past (US 1.0)' },
  { value: 'alttp-jp', label: 'A Link to the Past (JP 1.0)' },
  { value: 'sm-us', label: 'Super Metroid (US)' },
];

const MODES: readonly ModeCard[] = [
  { value: 'standard', label: 'Standard', description: 'The game as it shipped. Saves, playtime and widgets, no seed.', icon: 'play' },
  { value: 'local', label: 'Randomizer on this PC', description: 'Rolls a seed here and patches your ROM. Plays offline.', icon: 'sparkles' },
  { value: 'online', label: 'Randomizer online', description: 'Joins a multiworld room. Items travel between players.', icon: 'globe' },
];

const MODE_LABEL: Readonly<Record<ProfileMode, string>> = {
  '': 'Not chosen',
  standard: 'Standard',
  local: 'Randomizer, on this PC',
  online: 'Randomizer, online',
};

const PRESETS: readonly Choice[] = [
  { value: 'default', label: 'Default' },
  { value: 'speedrun', label: 'Speedrun' },
  { value: 'streaming', label: 'Streaming' },
];

const LANGUAGES: readonly Choice[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: 'Japanese' },
];

const MSU_PACKS: readonly Choice[] = [
  { value: 'none', label: 'No MSU pack' },
  { value: 'orchestral', label: 'Orchestral Hyrule' },
  { value: 'chiptune', label: 'Chiptune remix' },
];

const SERVERS: readonly Choice[] = [
  { value: '', label: 'Pick a room' },
  { value: 'archipelago.gg:38281', label: 'archipelago.gg:38281' },
  { value: 'eu.multiworld.net:51420', label: 'eu.multiworld.net:51420' },
];

const SEEDS = ['3fa9c1e7', 'b71e0244', '5c2d9a10', 'e04f7b3c', '9a13c6d8'];

const INITIAL_PROFILE: ProfileDraft = {
  name: '',
  rom: 'alttp-us',
  mode: '',
  seed: SEEDS[0] ?? '',
  server: '',
  slot: '',
  options: {},
  preset: 'default',
  language: 'en',
  msu: 'none',
};

const EXISTING_NAMES: readonly string[] = ['Casual run', 'Weekly async'];

export type { Choice, ProfileDraft };
export { EXISTING_NAMES, GAMES, INITIAL_PROFILE, LANGUAGES, MODE_LABEL, MODES, MSU_PACKS, PRESETS, SEEDS, SERVERS };
