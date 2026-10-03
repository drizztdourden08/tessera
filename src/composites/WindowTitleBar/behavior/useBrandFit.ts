/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { CONTROLS_SELECTOR, START_SELECTOR } from '../WindowTitleBar.constants';
import type { BrandFit } from '../WindowTitleBar.type';
import { brandFits } from './brand-fits';

const useBrandFit = (barRef: RefObject<HTMLElement | null>, brandRef: RefObject<HTMLElement | null>): BrandFit => {
  const [fit, setFit] = useState<BrandFit>('full');

  useLayoutEffect(() => {
    const bar = barRef.current;
    const brand = brandRef.current;
    if (!bar || !brand) return undefined;
    const update = () => setFit(brandFits(bar, brand));
    update();
    const view = ownerWindowOf(bar) as Window & typeof globalThis;
    if (typeof view.ResizeObserver === 'undefined') return undefined;
    const observer = new view.ResizeObserver(update);
    const sides = bar.querySelectorAll<HTMLElement>(`${START_SELECTOR}, ${CONTROLS_SELECTOR}`);
    [bar, brand, ...sides].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [barRef, brandRef]);

  return fit;
};

export { useBrandFit };
