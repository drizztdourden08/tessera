/* @layer renderer-components @kind util */
import type { NumberInputClassParams } from '../NumberInput.type';

const numberInputClass = (params: NumberInputClassParams): string => {
  const { size, sides, auto, disabled, className } = params;
  return [
    'number-input',
    `control-size--${size}`,
    sides && 'number-input--sides',
    auto && 'number-input--auto',
    disabled && 'number-input--disabled',
    className,
  ].filter(Boolean).join(' ');
};

export { numberInputClass };
