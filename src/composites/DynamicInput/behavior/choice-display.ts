/* @layer renderer-components @kind util */
import { choiceLabel } from './choice-label';
import { freeValue } from './free-value';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternChoice, PatternSlotValue } from '../DynamicInput.type';

const choiceDisplay = (slot: PatternSlotSpec, value: PatternSlotValue | undefined, options: readonly PatternChoice[]): string => {
  const found = options.find((option) => option.value === value);
  return found === undefined ? freeValue(slot, value) : choiceLabel(found);
};

export { choiceDisplay };
