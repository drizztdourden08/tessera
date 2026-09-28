/* @layer renderer-components @kind logic */
import { toNumber } from './to-number';

const inputValue = (value: unknown): number | string => {
  const parsed = toNumber(value);
  return Number.isFinite(parsed) ? parsed : '';
};

export { inputValue };
