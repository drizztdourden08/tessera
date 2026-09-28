/* @layer renderer-components @kind logic */
import { isEmptyValue } from './emptiness';

const testExistence = (value: unknown, op: string): boolean => {
  if (op === 'isEmpty') return isEmptyValue(value);
  if (op === 'isNotEmpty') return !isEmptyValue(value);
  return true;
};

export { testExistence };
