/* @layer renderer-components @kind util */
import { roundValue } from '../../../behavior/round-value';
import type { NumberPattern } from './label-rule.type';

const formatNumber = (value: number, pattern: NumberPattern | null): string => {
  if (pattern === null) return String(roundValue(value));
  const rounded = Number(value.toFixed(pattern.maxDecimals));
  return (rounded === 0 ? 0 : rounded).toLocaleString('en-US', {
    minimumFractionDigits: pattern.minDecimals,
    maximumFractionDigits: pattern.maxDecimals,
    useGrouping: pattern.grouping,
    signDisplay: pattern.sign ? 'exceptZero' : 'auto',
  });
};

export { formatNumber };
