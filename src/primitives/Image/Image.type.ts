/* @layer renderer-components @kind types */
import type { ImgHTMLAttributes, ReactNode } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}

export type { ImageProps };
