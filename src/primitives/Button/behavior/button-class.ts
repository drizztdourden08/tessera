/* @layer renderer-components @kind util */
import type { ButtonClassInput } from './button-class.type';

const buttonClass = (input: ButtonClassInput): string => {
  const { variant, size, look, fullWidth, active, loading, oneLine, className } = input;
  const pixel = look === 'pixel' && variant !== 'ghost';
  return [
    'btn',
    `btn--${variant}`,
    variant !== 'ghost' && !pixel && 'btn--toned',
    pixel && 'btn--pixel',
    `btn--${size}`,
    fullWidth && 'btn--full',
    oneLine && !fullWidth && 'btn--one-line',
    active && 'btn--active',
    loading && 'btn--loading',
    className,
  ].filter(Boolean).join(' ');
};

export { buttonClass };
