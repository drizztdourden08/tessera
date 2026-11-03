/* @layer renderer-components @kind util */
import { slotFromText } from './slot-from-text';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternChoice, PatternSlotValue } from '../DynamicInput.type';

const settleSearch = (slot: PatternSlotSpec, text: string, options: readonly PatternChoice[]): PatternSlotValue | undefined =>
  text.trim() === '' ? null : slotFromText(slot, text, options);

export { settleSearch };
