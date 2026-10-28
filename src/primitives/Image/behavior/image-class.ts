/* @layer renderer-components @kind util */
import type { ImageClassParams } from '../Image.type';
import { pixelatedOf } from './pixelated-of';

const imageClass = (params: ImageClassParams): string => {
  const { status, frame = false, fit = 'cover', backdrop = 'none', pixelated = false, natural, className } = params;
  return [
    'image', `image--${status}`, frame && 'image--framed', fit !== 'cover' && `image--fit-${fit}`, backdrop !== 'none' && `image--backdrop-${backdrop}`,
    pixelatedOf(pixelated, natural) && 'image--pixelated', className,
  ].filter(Boolean).join(' ');
};

export { imageClass };
