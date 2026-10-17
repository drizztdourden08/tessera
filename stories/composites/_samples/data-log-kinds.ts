/* @layer stories @kind data */
import type { LogKindDef, LogRow } from '../../../src/composites';
import { logClock } from './log-clock';

const SIM_KINDS: readonly LogKindDef[] = [
  { id: 'seq', label: 'Sequences', tone: 'primary', toneMessage: true, strong: true, uppercase: true },
  { id: 'area', label: 'Areas', tone: 'info', toneMessage: true, strong: true },
  { id: 'screen', label: 'Screens', tone: 'tertiary', strong: true },
  { id: 'pos', label: 'Positions', tone: 'muted', toneMessage: 'dim' },
  { id: 'backtrack', label: 'Backtracks', tone: 'muted', toneMessage: true },
  { id: 'flood', label: 'Flood', tone: 'teal', toneMessage: true },
  { id: 'reset', label: 'Resets', tone: 'warning', toneMessage: true, uppercase: true },
  { id: 'check', label: 'Checks', tone: 'secondary', toneMessage: true },
  { id: 'item', label: 'Items', tone: 'amber', toneMessage: true },
  { id: 'discover', label: 'Discoveries', tone: 'cyan' },
  { id: 'move', label: 'Moves', tone: 'muted', toneMessage: 'dim' },
  { id: 'unlock', label: 'Unlocks', tone: 'green', toneMessage: true },
  { id: 'outcome', label: 'Outcome', tone: 'violet', toneMessage: true, strong: true, uppercase: true },
  { id: 'info', label: 'Info', tone: 'muted' },
  { id: 'debug', label: 'Debug', tone: 'dim', toneMessage: true },
];

type Line = [kind: string, message: string, indent?: number];

const LINES: readonly Line[] = [
  ['seq', 'Sequence 1: start to the north cave'],
  ['area', 'Overworld, west region', 1],
  ['screen', 'Screen 12, the river crossing', 2],
  ['pos', 'x 184, y 96, facing left', 2],
  ['move', 'walk left 6 tiles, jump the gap', 2],
  ['flood', 'flood fill reached 41 screens', 1],
  ['discover', 'a cave entrance behind the waterfall', 2],
  ['check', 'chest in the north cave', 1],
  ['item', 'Candle found', 2],
  ['unlock', 'dark rooms are now reachable', 2],
  ['backtrack', 'back to the river crossing', 1],
  ['info', '12 checks reachable, 3 more need the Raft'],
  ['debug', 'cache hit for screen 12, 0.4 ms'],
  ['reset', 'reset to the last save'],
  ['seq', 'Sequence 2: the island palace'],
  ['area', 'Island palace, first floor', 1],
  ['check', 'key on the statue', 2],
  ['outcome', 'every check reachable in 2 sequences'],
];

const SIM_ROWS: LogRow[] = LINES.map(([kind, message, indent], i) => ({
  id: `sim-${i}`, gutter: logClock(20 * 3600 + i * 3), tag: kind.toUpperCase(), kind, message, indent,
}));

export { SIM_KINDS, SIM_ROWS };
