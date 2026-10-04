/* @layer stories @kind data */
import type { ValidationProblem } from '../../../src/composites';

const BUILDER_PROBLEMS: readonly ValidationProblem[] = [
  { id: 'names', message: 'Two players are named Bram', field: 'players.2.name' },
  { id: 'cleo', message: 'Cleo: import a player file', field: 'players.3.source' },
  { id: 'inventory', message: 'Ana: start_inventory must be a map of item names to counts', field: 'players.1.overrides' },
  { id: 'server', message: 'Pick a server to host on', field: 'host.server' },
  { id: 'dax', message: 'Dax: Ocarina of Time is not installed', field: 'players.4.game' },
  { id: 'port', message: 'The port must be between 1 and 65535', field: 'host.port' },
];

const SERVER_PROBLEMS: readonly ValidationProblem[] = [
  { id: 'key', message: 'Enter the path of the key file.', field: 'key-file' },
  { id: 'path', message: 'The Archipelago path must be absolute.', field: 'ap-path' },
];

const PRESET_PROBLEMS: readonly ValidationProblem[] = [
  { id: 'inventory', message: 'Start Inventory: "Bombs (10)" is above the max of 1', field: 'start_inventory' },
  { id: 'plando', message: 'Plando Texts: the JSON does not parse (line 3)', field: 'plando_texts' },
];

export { BUILDER_PROBLEMS, PRESET_PROBLEMS, SERVER_PROBLEMS };
