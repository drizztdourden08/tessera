/* @layer renderer-components @kind data */
import type { SplitOrientation } from '../SplitPane.type';
import type { SplitCommand } from './split-limits.type';

const KEY_STEP = 0.02;
const KEY_STEP_LARGE = 0.1;

const STEP_KEYS: Readonly<Record<SplitOrientation, Readonly<Record<string, number>>>> = {
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
  vertical: { ArrowUp: -1, ArrowDown: 1 },
};

const COMMAND_KEYS: Readonly<Record<string, SplitCommand>> = {
  Home: 'home',
  End: 'end',
  Enter: 'reset',
  ' ': 'reset',
};

export { COMMAND_KEYS, KEY_STEP, KEY_STEP_LARGE, STEP_KEYS };
