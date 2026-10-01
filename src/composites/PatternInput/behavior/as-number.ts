/* @layer renderer-components @kind util */
import type { PatternSlotValue } from '../PatternInput.type';

const asNumber = (value: PatternSlotValue | undefined): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

export { asNumber };
