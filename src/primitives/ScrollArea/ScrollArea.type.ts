/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef } from 'react';

type ScrollAxis = 'y' | 'x' | 'both';

interface ScrollPosition {
  top: number;
  left: number;
}

interface ScrollAreaProps extends Omit<ComponentPropsWithRef<'div'>, 'onScroll'> {
  axis?: ScrollAxis;
  fade?: boolean;
  onScroll?: (position: ScrollPosition) => void;
  scrollTo?: Partial<ScrollPosition>;
}

export type { ScrollAreaProps, ScrollAxis, ScrollPosition };
