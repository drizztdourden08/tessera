/* @layer stories @kind data */
import type { ItemListDemoProps, PresetOptions, SamplePreset } from './preset-samples.type';

const PRESET_DEFAULTS: PresetOptions = { tower: 7, ganon: 7, goal: 'ganon', keysanity: false, pool: 'normal', balancing: 50 };

const PRESETS: readonly SamplePreset[] = [
  {
    ...PRESET_DEFAULTS, id: 'p2', name: 'Keysanity', game: 'A Link to the Past', changes: 7, edited: 'edited 2 hours ago',
    notes: 'Thursday league race. Keys anywhere, a full tower.', keysanity: true, balancing: 65,
  },
  { ...PRESET_DEFAULTS, id: 'p4', name: 'Open, fast Ganon', game: 'A Link to the Past', changes: 3, notes: '', ganon: 4 },
  { ...PRESET_DEFAULTS, id: 'p6', name: 'Swordless chaos', game: 'A Link to the Past', changes: 12, notes: 'No sword. Bring bombs.', tower: 4, ganon: 4, pool: 'expert' },
  { ...PRESET_DEFAULTS, id: 'p1', name: 'Short run', game: 'Timespinner', changes: 2, edited: 'edited 3 days ago', notes: '', goal: 'pedestal' },
  { ...PRESET_DEFAULTS, id: 'p5', name: 'Bottle hunt', game: 'Ocarina of Time', changes: 11, missing: true, notes: '', goal: 'triforce' },
];

const SERVERS_ERROR = 'Could not read servers.json: unexpected end of input';

const PRESETS_EMPTY = 'Install a game from Games, then make a preset for it.';

const LIST_DEMO: Required<Omit<ItemListDemoProps, 'createLabel'>> = {
  state: 'ready', grouped: true, filter: true, actions: true, title: 'Presets',
};

export { LIST_DEMO, PRESET_DEFAULTS, PRESETS, PRESETS_EMPTY, SERVERS_ERROR };
