/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

interface ThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  placeholder?: ReactNode;
}

export type { ThumbnailProps };
