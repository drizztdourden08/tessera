/* @layer renderer-components @kind logic */
import type { TextClassParams } from './text-class-name.type';

const textClassName = (params: TextClassParams): string => {
  const { variant, size, font, leading, tone, mono, numeric, clamp, className } = params;
  return [
    'text',
    variant && `text--${variant}`,
    size && `text--${size}`,
    font && `text--font-${font}`,
    leading && `text--leading-${leading}`,
    tone && `text--toned text-el--tone-${tone}`,
    mono === true && 'text--mono',
    numeric === true && 'text--numeric',
    clamp === true && 'text--clamp',
    className,
  ].filter(Boolean).join(' ');
};

export { textClassName };
