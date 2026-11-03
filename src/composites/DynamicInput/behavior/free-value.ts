/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternSlotValue } from '../DynamicInput.type';

const freeValue = (slot: PatternSlotSpec, value: PatternSlotValue | undefined): string =>
  slot.free === true && typeof value === 'string' ? value : '';

export { freeValue };
