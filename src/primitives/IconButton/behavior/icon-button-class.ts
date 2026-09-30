/* @layer renderer-components @kind util */
import type { IconButtonClassInput } from './icon-button-class.type';

const iconButtonClass = (input: IconButtonClassInput): string => {
  const { variant, tone, size, active, loading, className } = input;
  return [
    'icon-btn',
    `icon-btn--${variant}`,
    variant !== 'ghost' && 'icon-btn--toned',
    tone && `icon-btn--tone-${tone}`,
    `icon-btn--${size}`,
    active && 'icon-btn--active',
    loading && 'icon-btn--loading',
    className,
  ].filter(Boolean).join(' ');
};

export { iconButtonClass };
