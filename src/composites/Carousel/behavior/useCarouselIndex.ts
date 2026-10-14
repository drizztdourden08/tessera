/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { CarouselIndex } from '../Carousel.type';
import { wrapIndex } from './wrap-index';

const useCarouselIndex = (count: number, index: number | undefined, defaultIndex: number, onIndexChange?: (index: number) => void): CarouselIndex => {
  const [own, setOwn] = useState(defaultIndex);
  const current = wrapIndex(index ?? own, count);
  const go = (next: number) => {
    const target = wrapIndex(next, count);
    if (target === current) return;
    if (index === undefined) setOwn(target);
    onIndexChange?.(target);
  };
  return { current, go };
};

export { useCarouselIndex };
