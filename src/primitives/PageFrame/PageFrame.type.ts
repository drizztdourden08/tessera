/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ScrollAreaProps } from '../ScrollArea';

type PageFrameWidth = 'sm' | 'md' | 'lg';

type PageFramePadding = 'md' | 'lg';

interface PageFrameProps extends Omit<ScrollAreaProps, 'axis' | 'children'> {
  width?: PageFrameWidth;
  padding?: PageFramePadding;
  fill?: boolean;
  children?: ReactNode;
}

export type { PageFramePadding, PageFrameProps, PageFrameWidth };
