/* @layer renderer-components @kind util */
import { NUMBER_LOCALE } from './value-rule.constants';
import type { DecimalFormat } from './value-rule.type';

const formatDecimal = (value: number, format: DecimalFormat): string => {
  const { minDecimals, maxDecimals, grouping, pad = 1, sign = false } = format;
  return value.toLocaleString(NUMBER_LOCALE, {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
    minimumIntegerDigits: pad,
    useGrouping: grouping,
    signDisplay: sign ? 'exceptZero' : 'auto',
  });
};

export { formatDecimal };
