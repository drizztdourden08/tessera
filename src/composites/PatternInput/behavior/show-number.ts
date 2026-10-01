/* @layer renderer-components @kind util */
import { asNumber } from './as-number';
import { formatNumber } from './format-number';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternSlotValue } from '../PatternInput.type';

const showNumber = (value: PatternSlotValue | undefined, slot: PatternSlotSpec, grouped = true): string => {
  const number = asNumber(value);
  return number === null ? '' : formatNumber(number, slot, grouped);
};

export { showNumber };
