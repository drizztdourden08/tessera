/* @layer renderer-components @kind constants */
import type { TreeKeyMove } from '../Tree.type';
import type { FocusStep } from './tree-key-move.constants.type';

const FOCUS_STEPS: Readonly<Record<string, FocusStep>> = {
  ArrowDown: (index) => index + 1,
  ArrowUp: (index) => index - 1,
  PageDown: (index, _count, page) => index + page,
  PageUp: (index, _count, page) => index - page,
  Home: () => 0,
  End: (_index, count) => count - 1,
};

const NONE: TreeKeyMove = { kind: 'none' };

export { FOCUS_STEPS, NONE };
