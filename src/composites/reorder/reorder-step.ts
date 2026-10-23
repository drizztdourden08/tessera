/* @layer renderer-components @kind util */
import { AXIS_KEYS } from './reorder.constants';
import type { ReorderKeyEvent, ReorderStepOptions } from './reorder.type';

const chordHeld = (event: ReorderKeyEvent, chord: ReorderStepOptions['chord']): boolean => {
  if (event.ctrlKey || event.metaKey) return false;
  return chord === 'alt' ? event.altKey : !event.altKey;
};

const reorderStep = (event: ReorderKeyEvent, options: ReorderStepOptions): number | undefined => {
  const { axis, chord, index, total } = options;
  const by = AXIS_KEYS[axis][event.key];
  if (by === undefined || !chordHeld(event, chord)) return undefined;
  const to = index + by;
  return to < 0 || to >= total ? undefined : to;
};

export { reorderStep };
