/* @layer stories @kind data */
import type { ManagedListDemoProps, SamplePreset } from './preset-samples.type';

const PRESETS: readonly SamplePreset[] = [
  { id: 'p2', name: 'Keysanity', game: 'A Link to the Past', changes: 7, edited: 'edited 2 hours ago', tower: 7, ganon: 7 },
  { id: 'p4', name: 'Open, fast Ganon', game: 'A Link to the Past', changes: 3, tower: 7, ganon: 7 },
  { id: 'p6', name: 'Swordless chaos', game: 'A Link to the Past', changes: 12, tower: 4, ganon: 4 },
  { id: 'p1', name: 'Short run', game: 'Timespinner', changes: 2, edited: 'edited 3 days ago', tower: 7, ganon: 7 },
  { id: 'p5', name: 'Bottle hunt', game: 'Ocarina of Time', changes: 11, missing: true, tower: 7, ganon: 7 },
];

const SERVERS_ERROR = 'Could not read servers.json: unexpected end of input';

const PRESETS_EMPTY = 'Install a game from Games, then make a preset for it.';

const LIST_DEMO: Required<Omit<ManagedListDemoProps, 'createLabel'>> = {
  state: 'ready', grouped: true, filter: true, actions: true, title: 'Presets',
};

export { LIST_DEMO, PRESETS, PRESETS_EMPTY, SERVERS_ERROR };
