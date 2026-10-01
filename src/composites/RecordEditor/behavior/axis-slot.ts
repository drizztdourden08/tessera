/* @layer renderer-components @kind util */
import { LABEL_SPECIALS } from './position-pattern.constants';
import type { NumberBounds } from '../../field-kits/registry.type';

const decimalsOf = (step: number | undefined): number => (step === undefined ? 0 : (String(step).split('.')[1] ?? '').length);

const rangeOf = (bounds: NumberBounds | undefined): string =>
  bounds?.min === undefined && bounds?.max === undefined ? '' : `${bounds.min ?? ''}..${bounds.max ?? ''}`;

const axisSlot = (key: string, label: string, bounds: NumberBounds | undefined): string => {
  const places = decimalsOf(bounds?.step);
  const args = [
    places > 0 ? `decimal ${places}` : 'number',
    rangeOf(bounds),
    bounds?.step === undefined ? '' : `step${bounds.step}`,
    `"${label.replace(LABEL_SPECIALS, '\\$&')}"`,
  ];
  return `{${key}:${args.filter((arg) => arg !== '').join(' ')}}`;
};

export { axisSlot };
