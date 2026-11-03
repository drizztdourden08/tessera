/* @layer renderer-components @kind logic */
import { parsePattern } from '../../DynamicInput';

const specNames = (pattern: string): readonly string[] => parsePattern(pattern).slots.map((slot) => slot.name);

export { specNames };
