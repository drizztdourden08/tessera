/* @layer renderer-components @kind util */
import type { ImageClassParams } from '../Image.type';
import { pixelatedOf } from './pixelated-of';

const imageClass = (params: ImageClassParams): string => {
  const { status, frame = false, fit = 'cover', pixelated = false, natural, className } = params;
  return [
    'image', `image--${status}`, frame && 'image--framed', fit !== 'cover' && `image--fit-${fit}`,
    pixelatedOf(pixelated, natural) && 'image--pixelated', className,
  ].filter(Boolean).join(' ');
};

export { imageClass };
