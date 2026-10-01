/* @layer renderer-components @kind util */
import type { PatternSlotValue } from '../PatternInput.type';

const asText = (value: PatternSlotValue | undefined): string => {
  if (typeof value === 'string') return value;
  return typeof value === 'number' ? String(value) : '';
};

export { asText };
