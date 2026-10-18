/* @layer renderer-components @kind data */
import type { SplitOrientation } from '../SplitPane/SplitPane.type';

const DEFAULT_STEP = 16;

const DEFAULT_LARGE_STEP = 64;

const FOLD_SNAP_TOKEN = '--resize-handle-snap';

const FOLD_SNAP_FALLBACK = 32;

const STEP_KEYS: Readonly<Record<SplitOrientation, Readonly<Record<string, number>>>> = {
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
  vertical: { ArrowUp: -1, ArrowDown: 1 },
};

export { DEFAULT_LARGE_STEP, DEFAULT_STEP, FOLD_SNAP_FALLBACK, FOLD_SNAP_TOKEN, STEP_KEYS };
