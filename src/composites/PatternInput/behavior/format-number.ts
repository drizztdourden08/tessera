/* @layer renderer-components @kind util */
import { NUMBER_LOCALE } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const formatNumber = (value: number, slot: PatternSlotSpec, grouped: boolean): string => {
  const places = slot.type === 'decimal' ? slot.places ?? 0 : 0;
  const text = Math.abs(value).toLocaleString(NUMBER_LOCALE, {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
    minimumIntegerDigits: slot.pad ?? 1,
    useGrouping: grouped && slot.group === true,
  });
  return value < 0 ? `-${text}` : text;
};

export { formatNumber };
