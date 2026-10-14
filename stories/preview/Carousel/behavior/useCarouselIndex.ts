/* @layer stories @kind hook */
import { useState } from 'react';

const wrap = (index: number, count: number): number => (count === 0 ? 0 : ((index % count) + count) % count);

const useCarouselIndex = (count: number, index: number | undefined, defaultIndex: number, onIndexChange?: (index: number) => void) => {
  const [own, setOwn] = useState(defaultIndex);
  const current = wrap(index ?? own, count);
  const go = (next: number) => {
    const target = wrap(next, count);
    if (index === undefined) setOwn(target);
    onIndexChange?.(target);
  };
  return { current, go };
};

export { useCarouselIndex };
