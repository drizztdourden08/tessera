/* @layer renderer-components @kind data */
import type { ReorderAxis, ReorderLinearAxis } from './reorder.type';

const AXIS_KEYS: Readonly<Record<ReorderAxis, Readonly<Record<string, number>>>> = {
  vertical: { ArrowUp: -1, ArrowDown: 1 },
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
  grid: { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1 },
};

const NO_KEYS: readonly string[] = [];

const ROW_KEYS: ReadonlySet<string> = new Set(['ArrowUp', 'ArrowDown']);

const AXIS_BOX: Readonly<Record<ReorderLinearAxis, { start: 'top' | 'left'; size: 'height' | 'width'; pointer: 'clientY' | 'clientX' }>> = {
  vertical: { start: 'top', size: 'height', pointer: 'clientY' },
  horizontal: { start: 'left', size: 'width', pointer: 'clientX' },
};

export { AXIS_BOX, AXIS_KEYS, NO_KEYS, ROW_KEYS };
