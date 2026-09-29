/* @layer stories @kind data */
import { CHARACTER_KEYS, FUNCTION_KEY_COUNT, KEY_SPECS, LETTER_KEYS, MOUSE_SPECS, SHORTCUT_LEGENDS } from '../../../src/primitives';
import type {
  CapWidth, KeyName, MouseButton, ShortcutKey, ShortcutKeys, ShortcutLegend, ShortcutState,
} from '../../../src/primitives';

type ShortcutRow = {
  keys?: ShortcutKeys;
  mouse?: MouseButton;
  legend?: ShortcutLegend;
  width?: CapWidth;
  animate?: boolean;
  state?: ShortcutState;
};

const MOUSE_BUTTONS = Object.keys(MOUSE_SPECS) as MouseButton[];

const FUNCTION_KEYS = Array.from({ length: FUNCTION_KEY_COUNT }, (_, index) => `F${index + 1}`);

const PRINTABLE_KEYS = [...LETTER_KEYS, ...CHARACTER_KEYS, ...FUNCTION_KEYS] as ShortcutKey[];

const legendsOf = (key: KeyName): ShortcutLegend[] => SHORTCUT_LEGENDS.filter((legend) => legend in KEY_SPECS[key]);

const MULTI_LEGEND_KEYS = (Object.keys(KEY_SPECS) as KeyName[]).filter((key) => legendsOf(key).length > 1);

const CAP_WIDTH_ROWS: readonly ShortcutRow[] = [
  { keys: 'shift', legend: 'symbol', width: 'wide' },
  { keys: 'shift', legend: 'symbol', width: 'normal' },
  { keys: 'backspace', legend: 'arrow', width: 'normal' },
  { keys: 'backspace', legend: 'label', width: 'wide' },
  { keys: 'tab', legend: 'label', width: 'wide' },
  { keys: 'tab', legend: 'symbol', width: 'normal' },
  { keys: 'ctrl', width: 'wide' },
  { keys: 'space', width: 'normal' },
];

const COMBINATION_ROWS: readonly ShortcutRow[] = [
  { keys: ['ctrl', 'S'] },
  { keys: ['ctrl', 'shift', 'P'] },
  { keys: ['ctrl', 'alt', 'delete'] },
  { keys: ['cmd', 'shift', 'P'], legend: 'symbol' },
  { keys: ['ctrl', 'option', 'cmd', 'space'], legend: 'symbol' },
];

const KEYS_AND_MOUSE_ROWS: readonly ShortcutRow[] = [
  { keys: 'ctrl', mouse: 'left' },
  { keys: 'shift', mouse: 'wheel-down' },
  { keys: ['ctrl', 'alt'], mouse: 'right' },
  { keys: 'shift', mouse: 'back' },
  { keys: 'cmd', mouse: 'left', legend: 'symbol' },
];

const ANIMATED_ROWS: readonly ShortcutRow[] = [
  { keys: 'space', animate: true },
  { keys: ['ctrl', 'shift', 'P'], animate: true },
  { mouse: 'left', animate: true },
  { mouse: 'wheel-up', animate: true },
  { mouse: 'forward', animate: true },
  { keys: 'ctrl', mouse: 'left', animate: true },
  { keys: ['shift', 'alt'], mouse: 'right', legend: 'symbol', animate: true },
];

const STATE_ROWS: readonly ShortcutRow[] = [
  { keys: ['ctrl', 'S'], state: 'idle' },
  { keys: ['ctrl', 'S'], state: 'lit' },
  { keys: ['ctrl', 'S'], state: 'pressed' },
  { mouse: 'left', state: 'idle' },
  { mouse: 'left', state: 'lit' },
  { mouse: 'left', state: 'pressed' },
  { keys: 'ctrl', mouse: 'right', state: 'pressed' },
];

export {
  ANIMATED_ROWS, CAP_WIDTH_ROWS, COMBINATION_ROWS, KEYS_AND_MOUSE_ROWS, legendsOf, MOUSE_BUTTONS,
  MULTI_LEGEND_KEYS, PRINTABLE_KEYS, STATE_ROWS,
};
export type { ShortcutRow };
