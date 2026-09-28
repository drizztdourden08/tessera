/* @layer renderer-components @kind logic */
import { isNullish } from './coerce';

const isEmptyValue = (value: unknown): boolean => {
  if (isNullish(value)) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
};

export { isEmptyValue };
