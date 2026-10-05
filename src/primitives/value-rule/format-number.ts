/* @layer renderer-components @kind util */
import { formatDecimal } from './format-decimal';
import { roundValue } from './round-value';
import type { NumberPattern } from './value-rule.type';

const formatNumber = (value: number, pattern: NumberPattern | null): string => {
  if (pattern === null) return String(roundValue(value));
  const rounded = Number(value.toFixed(pattern.maxDecimals));
  return formatDecimal(rounded === 0 ? 0 : rounded, pattern);
};

export { formatNumber };
