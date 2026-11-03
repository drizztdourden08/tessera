/* @layer renderer-components @kind logic */
import type { CommandValues } from '../CommandInput.type';

const specBlank = (values: CommandValues): boolean =>
  Object.values(values).every((value) => value === false || (typeof value === 'string' && value.trim() === ''));

export { specBlank };
