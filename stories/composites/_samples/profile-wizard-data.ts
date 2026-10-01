/* @layer stories @kind data */
import type { IconName } from '../../../src/primitives';
import { ROM_FILE } from './rotp-profiles';

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

const ROMS: readonly Choice[] = [{ value: ROM_FILE, label: ROM_FILE }];

const MODES: readonly ModeCard[] = [
  { value: 'standard', label: 'Standard', description: 'The game as it shipped, with your preset, saves and widgets. No seed.', icon: 'play' },
  { value: 'local', label: 'Randomizer, local', description: 'A seed is thrown on this PC and the items are placed before you start.', icon: 'sparkles' },
  { value: 'online', label: 'Randomizer, online', description: 'Joins an Archipelago room. Items travel between players in the session.', icon: 'globe' },
];

const MODE_LABEL: Readonly<Record<ProfileMode, string>> = {
  '': 'Not chosen',
  standard: 'Standard',
  local: 'Randomizer, local',
  online: 'Randomizer, online (Archipelago)',
};

const ENHANCED = 'Enhanced';

const PRESETS = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: ENHANCED, label: ENHANCED },
];

const PRESET_HINT: Readonly<Record<string, string>> = {
  vanilla: 'The original 4:3 picture and rules, nothing added.',
  [ENHANCED]: 'Widescreen, autosave, the new HUD, quality of life and bug fixes.',
};

const LANGUAGES: readonly Choice[] = [
  { value: '', label: 'Default (English)' },
  { value: 'de', label: 'German (Deutsch)' },
  { value: 'fr', label: 'French (Français)' },
  { value: 'fr-c', label: 'French Canadian' },
  { value: 'es', label: 'Spanish (Español)' },
  { value: 'pl', label: 'Polish (Polski)' },
  { value: 'pt', label: 'Portuguese (Português)' },
  { value: 'nl', label: 'Dutch (Nederlands)' },
  { value: 'sv', label: 'Swedish (Svenska)' },
  { value: 'redux', label: 'Redux' },
];

const MSU_PACKS: readonly Choice[] = [
  { value: '', label: 'None' },
  { value: 'alttp-orchestral', label: 'alttp-orchestral' },
  { value: 'alttp-remastered', label: 'alttp-remastered' },
];

const SEEDS = ['3f9a0c71be42d580', 'b71e0244c93a5f16', '5c2d9a10e87b4403', 'e04f7b3c19d26a85'];

const INITIAL_PROFILE: ProfileDraft = {
  name: '',
  rom: ROM_FILE,
  mode: '',
  seed: SEEDS[0] ?? '',
  server: '',
  slot: '',
  options: {},
  preset: ENHANCED,
  language: '',
  msu: '',
};

const EXISTING_NAMES: readonly string[] = ['Casual run', 'Weekly async', 'Speedrun seed'];

export type { Choice, ProfileDraft };
export { EXISTING_NAMES, INITIAL_PROFILE, LANGUAGES, MODE_LABEL, MODES, MSU_PACKS, PRESET_HINT, PRESETS, ROMS, SEEDS };
