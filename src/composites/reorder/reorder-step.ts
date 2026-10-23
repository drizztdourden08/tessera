/* @layer renderer-components @kind util */
import { AXIS_KEYS, ROW_KEYS } from './reorder.constants';
import type { ReorderKeyEvent, ReorderStepOptions } from './reorder.type';

const chordHeld = (event: ReorderKeyEvent, chord: ReorderStepOptions['chord']): boolean => {
  if (event.ctrlKey || event.metaKey) return false;
  return chord === 'alt' ? event.altKey : !event.altKey;
};

const reorderStep = (event: ReorderKeyEvent, options: ReorderStepOptions): number | undefined => {
  const { axis, chord, index, total, columns = 1 } = options;
  const by = AXIS_KEYS[axis][event.key];
  if (by === undefined || !chordHeld(event, chord)) return undefined;
  const to = index + by * (axis === 'grid' && ROW_KEYS.has(event.key) ? columns : 1);
  return to < 0 || to >= total ? undefined : to;
};

export { reorderStep };
