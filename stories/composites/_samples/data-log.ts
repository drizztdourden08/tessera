/* @layer stories @kind data */
import type { LogKindDef, LogRow } from '../../../src/composites';

const LOG_KINDS: readonly LogKindDef[] = [
  { id: 'join', label: 'Joins', tone: 'info' },
  { id: 'item', label: 'Item sends', tone: 'secondary' },
  { id: 'hint', label: 'Hints', tone: 'primary' },
  { id: 'chat', label: 'Chat', tone: 'dim' },
  { id: 'goal', label: 'Goals' },
  { id: 'error', label: 'Errors', tone: 'danger', toneMessage: true },
];

type Line = [time: string, kind: string, message: string, indent?: number];

const LINES: readonly Line[] = [
  ['19:02:11', 'join', 'Wren (Hollow Knight) joined slot 1'],
  ['19:02:14', 'join', 'Tavi (Stardew Valley) joined slot 3'],
  ['19:02:30', 'chat', 'Wren: everyone ready? starting in 1 minute'],
  ['19:04:02', 'item', 'Tavi sent Mantis Claw to Wren'],
  ['19:04:02', 'item', 'found at Pierre\'s General Store', 1],
  ['19:05:47', 'hint', 'Priya asked for a hint: Grappling Hook'],
  ['19:05:47', 'hint', 'Grappling Hook is at Wrecked Ship Energy Tank in Bastien\'s world', 1],
  ['19:05:48', 'hint', 'cost 10 points, 9 left', 2],
  ['19:07:13', 'error', 'Juno lost connection: socket closed by peer'],
  ['19:07:13', 'error', 'retrying in 5 seconds', 1],
  ['19:09:55', 'item', 'Dax sent Oil Processing to Oskar'],
  ['19:11:20', 'chat', 'Oskar: thank you, that unblocks the whole refinery'],
  ['19:15:02', 'goal', 'Marlowe completed their goal (Celeste)'],
  ['19:15:02', 'item', 'released 14 remaining items to their owners', 1],
  ['19:18:40', 'item', 'Kaede sent Speed Booster to Bastien'],
  ['19:21:05', 'join', 'Juno reconnected on slot 6'],
];

const LOG_ROWS: LogRow[] = LINES.map(([time, kind, message, indent], i) => ({
  id: `line-${i}`,
  gutter: time,
  tag: kind.toUpperCase(),
  kind,
  message,
  indent,
}));

const pad = (n: number): string => String(n).padStart(2, '0');

const longSession = (count: number): LogRow[] =>
  Array.from({ length: count }, (_, i) => {
    const seconds = 19 * 3600 + i * 7;
    const clock = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`;
    return { id: `long-${i}`, gutter: clock, tag: 'ITEM', kind: 'item', message: `Check ${i + 1}: item sent to slot ${(i % 14) + 1}` };
  });

export { LOG_KINDS, LOG_ROWS, longSession };
