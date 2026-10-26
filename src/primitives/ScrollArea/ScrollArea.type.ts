/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef } from 'react';

type ScrollAxis = 'y' | 'x' | 'both';

type ScrollAreaScrollbar = 'native' | 'slim';

type ScrollAreaGutter = 'auto' | 'stable';

interface ScrollPosition {
  top: number;
  left: number;
}

interface ScrollAreaProps extends Omit<ComponentPropsWithRef<'div'>, 'onScroll'> {
  axis?: ScrollAxis;
  fade?: boolean;
  scrollbar?: ScrollAreaScrollbar;
  gutter?: ScrollAreaGutter;
  onScroll?: (position: ScrollPosition) => void;
  scrollTo?: Partial<ScrollPosition>;
}

export type { ScrollAreaGutter, ScrollAreaProps, ScrollAreaScrollbar, ScrollAxis, ScrollPosition };
