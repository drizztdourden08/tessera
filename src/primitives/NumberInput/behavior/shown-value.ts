/* @layer renderer-components @kind util */
import type { NumberInputProps } from '../NumberInput.type';

const shownValue = (value: NumberInputProps['value']): NumberInputProps['value'] =>
  typeof value === 'number' && Number.isNaN(value) ? '' : value;

export { shownValue };
