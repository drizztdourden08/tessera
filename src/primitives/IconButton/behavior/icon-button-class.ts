/* @layer renderer-components @kind util */
import type { IconButtonClassInput } from './icon-button-class.type';

const iconButtonClass = (input: IconButtonClassInput): string => {
  const { variant, tone, size, active, mixed, loading, className } = input;
  return [
    'icon-btn',
    `icon-btn--${variant}`,
    variant !== 'ghost' && variant !== 'quiet' && 'icon-btn--toned',
    tone && `icon-btn--tone-${tone}`,
    `icon-btn--${size}`,
    size === '2xs' && 'hit-area',
    active && 'icon-btn--active',
    mixed && 'icon-btn--mixed',
    loading && 'icon-btn--loading',
    className,
  ].filter(Boolean).join(' ');
};

export { iconButtonClass };
