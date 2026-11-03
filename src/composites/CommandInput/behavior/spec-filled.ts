/* @layer renderer-components @kind logic */
import type { CommandValue } from '../CommandInput.type';

const specFilled = (value: CommandValue | undefined): boolean => {
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'string') return value.trim() !== '';
  return value !== undefined;
};

export { specFilled };
