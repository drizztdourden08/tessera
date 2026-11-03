/* @layer renderer-components @kind logic */
import type { PatternValue } from '../../DynamicInput';
import type { CommandValues } from '../CommandInput.type';

const specSlotValues = (value: PatternValue): CommandValues =>
  Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string | number] => entry[1] !== null));

export { specSlotValues };
