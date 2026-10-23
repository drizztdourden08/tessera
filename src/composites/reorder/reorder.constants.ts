/* @layer renderer-components @kind data */
import type { ReorderAxis } from './reorder.type';

const AXIS_KEYS: Readonly<Record<ReorderAxis, Readonly<Record<string, number>>>> = {
  vertical: { ArrowUp: -1, ArrowDown: 1 },
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
};

const AXIS_BOX = {
  vertical: { start: 'top', size: 'height', pointer: 'clientY' },
  horizontal: { start: 'left', size: 'width', pointer: 'clientX' },
} as const;

export { AXIS_BOX, AXIS_KEYS };
