/* @layer renderer-components @kind logic */
import type { PatternSlotValue, PatternValue } from '../../DynamicInput';
import type { CommandValue, CommandValues } from '../CommandInput.type';
import { specNames } from './spec-names';

const slotOf = (value: CommandValue | undefined): PatternSlotValue => (typeof value === 'string' || typeof value === 'number' ? value : null);

const specPatternValue = (pattern: string, values: CommandValues): PatternValue =>
  Object.fromEntries(specNames(pattern).map((name) => [name, slotOf(values[name])]));

export { specPatternValue };
