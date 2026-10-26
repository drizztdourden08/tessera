/* @layer renderer-components @kind util */
import type { ButtonFill, ButtonLook, ButtonVariant } from '../Button.type';
import type { ButtonClassInput } from './button-class.type';

const surfaceClasses = (variant: ButtonVariant, look: ButtonLook | undefined, fill: ButtonFill | undefined): string[] => {
  if (variant === 'ghost') return [];
  if (fill === 'gradient' && look !== 'pixel' && variant === 'primary') return ['btn--gradient'];
  const solid = fill === 'solid' || fill === 'gradient' ? ['btn--solid'] : [];
  if (look === 'pixel') return ['btn--pixel', ...solid];
  return solid.length > 0 ? solid : ['btn--toned'];
};

const buttonClass = (input: ButtonClassInput): string => {
  const { variant, size, look, fill, width, fullWidth, active, loading, oneLine, link, className } = input;
  return [
    'btn',
    `btn--${variant}`,
    ...surfaceClasses(variant, look, fill),
    `btn--${size}`,
    link && 'btn--link',
    width === 'wide' && 'btn--wide',
    fullWidth && 'btn--full',
    oneLine && !fullWidth && 'btn--one-line',
    active && 'btn--active',
    loading && 'btn--loading',
    className,
  ].filter(Boolean).join(' ');
};

export { buttonClass };
