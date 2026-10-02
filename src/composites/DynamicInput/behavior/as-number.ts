/* @layer renderer-components @kind util */
import type { PatternSlotValue } from '../DynamicInput.type';

const asNumber = (value: PatternSlotValue | undefined): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

export { asNumber };
