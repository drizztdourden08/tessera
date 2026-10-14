/* @layer stories @kind types */
import type { FocusEventHandler, MouseEventHandler, ReactNode, RefObject } from 'react';

interface CarouselSlide {
  id: string;
  label: string;
  content: ReactNode;
}

interface CarouselProps {
  slides: readonly CarouselSlide[];
  label: string;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  turnEvery?: number | null;
  className?: string;
}

interface UseCarouselParams {
  count: number;
  index?: number;
  defaultIndex: number;
  onIndexChange?: (index: number) => void;
  turnEvery: number | null;
  ref: RefObject<HTMLElement | null>;
}

interface CarouselHold {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
}

interface CarouselState {
  index: number;
  go: (index: number) => void;
  step: (by: number) => void;
  canTurn: boolean;
  turning: boolean;
  stopped: boolean;
  toggleStopped: () => void;
  hold: CarouselHold;
}

interface CarouselBarProps {
  slides: readonly CarouselSlide[];
  state: CarouselState;
}

export type { CarouselBarProps, CarouselProps, CarouselSlide, CarouselState, UseCarouselParams };
