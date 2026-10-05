/* @layer renderer-components @kind util */
import { formatDecimal } from '../../../primitives/value-rule/format-decimal';
import type { PatternSlotSpec } from './parse-pattern.type';

const formatNumber = (value: number, slot: PatternSlotSpec, grouped: boolean): string => {
  const places = slot.type === 'decimal' ? slot.places ?? 0 : 0;
  const text = formatDecimal(Math.abs(value), { minDecimals: places, maxDecimals: places, pad: slot.pad ?? 1, grouping: grouped && slot.group === true });
  return value < 0 ? `-${text}` : text;
};

export { formatNumber };
