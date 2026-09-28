/* @layer renderer-components @kind util */
import type { ButtonClassInput } from './button-class.type';

const buttonClass = (input: ButtonClassInput): string => {
  const { variant, size, fullWidth, active, className } = input;
  return [
    'btn',
    `btn--${variant}`,
    variant !== 'ghost' && 'btn--toned',
    `btn--${size}`,
    fullWidth && 'btn--full',
    active && 'btn--active',
    className,
  ].filter(Boolean).join(' ');
};

export { buttonClass };
