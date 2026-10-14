/* @layer renderer-components @kind types */
import type { FocusEventHandler, MouseEventHandler, ReactNode, RefObject } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { IconButtonSize, IconButtonVariant } from '../../primitives/IconButton/IconButton.type';

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

interface CarouselIndex {
  current: number;
  go: (index: number) => void;
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
  mask?: DataAttributes;
}

interface CarouselButtonProps {
  icon: IconName;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
}

export type { CarouselBarProps, CarouselButtonProps, CarouselIndex, CarouselProps, CarouselSlide, CarouselState, UseCarouselParams };
