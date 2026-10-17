/* @layer stories @kind data */
import type { LogKindDef, LogRow } from '../../../src/composites';
import { logClock } from './log-clock';

const CHANNEL_KINDS: readonly LogKindDef[] = [
  { id: 'core', label: 'Core', tone: '#44aa99' },
  { id: 'app', label: 'App', tone: '#5b9bd5' },
  { id: 'randomizer', label: 'Randomizer', tone: '#b388ff' },
  { id: 'wasm', label: 'Wasm', tone: '#4dd0e1' },
  { id: 'ipc', label: 'IPC', tone: '#ffd54f' },
  { id: 'sim', label: 'Simulator', tone: '#ff9e64' },
  { id: 'net', label: 'Network', tone: '#2b3a8c' },
  { id: 'error', label: 'Errors', tone: '#e94560', toneMessage: true },
];

type Line = [kind: string, message: string];

const LINES: readonly Line[] = [
  ['core', 'emulator core loaded, 60.1 frames a second'],
  ['app', 'profile Saturday multiworld opened'],
  ['randomizer', 'seed 48213 placed 212 items'],
  ['wasm', 'module ready in 84 ms'],
  ['ipc', 'window bounds saved'],
  ['sim', 'simulation started for 4 players'],
  ['net', 'connected to the room on port 38281 (the dark #2b3a8c is lifted until it reads)'],
  ['error', 'save state 3 could not be read'],
];

const CHANNEL_ROWS: LogRow[] = LINES.map(([kind, message], i) => ({
  id: `channel-${i}`, gutter: logClock(21 * 3600 + i * 5), tag: `${kind}:`, kind, message,
}));

export { CHANNEL_KINDS, CHANNEL_ROWS };
