/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent, useState } from 'react';
import { useInView } from '../../../primitives/dom/useInView';
import { usePageVisible } from '../../../primitives/dom/usePageVisible';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
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
  const turn = useEffectEvent(() => go(current + 1));

  useEffect(() => {
    if (!turning) return undefined;
    const timer = window.setTimeout(turn, turnEvery);
    return () => window.clearTimeout(timer);
  }, [turning, turnEvery, current]);

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
