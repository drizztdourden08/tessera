/* @layer renderer-components @kind logic */
import { CHIP_VALUES_SHOWN } from './clause-value-text.constants';
import type { ClauseValueInput } from './clause-value-text.type';

const isBlank = (value: unknown): boolean => value === null || value === undefined || value === '';

const listText = (values: readonly unknown[], input: ClauseValueInput): string => {
  const shown = values.slice(0, CHIP_VALUES_SHOWN).map(String).join(', ');
  const more = values.length - CHIP_VALUES_SHOWN;
  return more > 0 ? input.strings.moreValues(shown, more) : shown;
};

const clauseValueText = (input: ClauseValueInput): string | undefined => {
  const { op, value, strings } = input;
  if (Array.isArray(value)) {
    const filled = value.filter((entry) => !isBlank(entry));
    if (filled.length === 0) return undefined;
    if (op !== 'between') return listText(filled, input);
    const [low, high] = [value[0], value[1]].map((entry) => (isBlank(entry) ? strings.openBound : String(entry)));
    return strings.valueRange(low ?? strings.openBound, high ?? strings.openBound);
  }
  return isBlank(value) ? undefined : String(value);
};

export { clauseValueText };
