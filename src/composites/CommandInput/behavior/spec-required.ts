/* @layer renderer-components @kind logic */
import { parsePattern } from '../../DynamicInput';

const specRequired = (pattern: string): readonly string[] =>
  parsePattern(pattern).slots.filter((slot) => slot.optional !== true).map((slot) => slot.name);

export { specRequired };
