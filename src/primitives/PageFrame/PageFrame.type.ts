/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ScrollAreaProps } from '../ScrollArea';

type PageFrameWidth = 'sm' | 'md' | 'lg';

interface PageFrameProps extends Omit<ScrollAreaProps, 'axis' | 'children'> {
  width?: PageFrameWidth;
  fill?: boolean;
  children?: ReactNode;
}

export type { PageFrameProps, PageFrameWidth };
