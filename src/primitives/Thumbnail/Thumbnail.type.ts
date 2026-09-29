/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ImageProps } from '../Image';

interface ThumbnailProps extends Omit<ImageProps, 'src' | 'placeholder' | 'fallback'> {
  src?: string | null;
  placeholder?: ReactNode;
}

export type { ThumbnailProps };
