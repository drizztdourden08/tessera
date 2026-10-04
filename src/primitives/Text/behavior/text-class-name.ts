/* @layer renderer-components @kind logic */
import type { TextClassParams } from './text-class-name.type';

const textClassName = (params: TextClassParams): string => {
  const { variant, tone, mono, numeric, className } = params;
  return [
    'text',
    variant && `text--${variant}`,
    tone && `text--toned text-el--tone-${tone}`,
    mono === true && 'text--mono',
    numeric === true && 'text--numeric',
    className,
  ].filter(Boolean).join(' ');
};

export { textClassName };
