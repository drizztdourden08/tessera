/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import { useInView } from '../../../../src/primitives/dom/useInView';
import { usePageVisible } from '../../../../src/primitives/dom/usePageVisible';
import { useReducedMotion } from '../../../../src/primitives/dom/useReducedMotion';
import type { CarouselState, UseCarouselParams } from '../Carousel.type';
import { useCarouselIndex } from './useCarouselIndex';

const useCarousel = (params: UseCarouselParams): CarouselState => {
  const { count, index, defaultIndex, onIndexChange, turnEvery, ref } = params;
  const { current, go } = useCarouselIndex(count, index, defaultIndex, onIndexChange);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduced = useReducedMotion(ref);
  const visible = usePageVisible(ref);
  const inView = useInView(ref);
  const canTurn = turnEvery !== null && count > 1 && !reduced;
  const turning = canTurn && !stopped && !hovered && !focused && visible && inView;

  useEffect(() => {
    if (!turning) return undefined;
    const timer = window.setTimeout(() => go(current + 1), turnEvery);
    return () => window.clearTimeout(timer);
  });

  return {
    index: current,
    go,
    step: (by) => go(current + by),
    canTurn,
    turning,
    stopped,
    toggleStopped: () => setStopped((on) => !on),
    hold: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); },
    },
  };
};

export { useCarousel };
