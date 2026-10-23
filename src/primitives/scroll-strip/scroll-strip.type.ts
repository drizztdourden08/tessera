/* @layer renderer-components @kind types */
import type { AriaAttributes, AriaRole, ElementType, ReactNode, Ref, RefObject } from 'react';

interface StripMetrics {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
}

interface StripEdges {
  canScrollBack: boolean;
  canScrollForward: boolean;
}

interface WheelGesture {
  deltaX: number;
  deltaY: number;
}

interface ScrollStripState extends StripEdges {
  rootRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  handleScroll: () => void;
  pageBy: (direction: -1 | 1) => void;
}

interface ScrollStripLabels {
  back: string;
  forward: string;
}

interface ScrollStripProps {
  pagerLabels: ScrollStripLabels;
  children: ReactNode;
  as?: ElementType;
  trackAs?: ElementType;
  className?: string;
  trackClassName?: string;
  trackRole?: AriaRole;
  trackRef?: Ref<HTMLElement>;
  trackProps?: AriaAttributes;
  'aria-label'?: string;
}

interface ScrollStripPagerProps {
  side: 'back' | 'forward';
  label: string;
  onPage: () => void;
}

export type {
  ScrollStripPagerProps,
  ScrollStripProps,
  ScrollStripState,
  StripEdges,
  StripMetrics,
  WheelGesture,
};
