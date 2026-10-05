/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { CONTROLS_SELECTOR, FULL_FIT, ITEM_SELECTOR, PROBE_SELECTOR, START_SELECTOR } from '../WindowTitleBar.constants';
import type { BarFit } from './bar-fit.type';
import { fitStep } from './fit-step';
import { measureBar } from './measure-bar';
import { sameFit } from './same-fit';

const useTitleBarFit = (
  barRef: RefObject<HTMLElement | null>,
  brandRef: RefObject<HTMLElement | null>,
  order: readonly string[],
  beforeChange: () => void,
): BarFit => {
  const [fit, setFit] = useState<BarFit>(FULL_FIT);
  const fitRef = useRef<BarFit>(FULL_FIT);
  const orderKey = JSON.stringify(order);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const brand = brandRef.current;
    if (!bar || !brand) return undefined;
    const ids = JSON.parse(orderKey) as string[];
    const update = (observed: boolean) => {
      const step = fitStep(measureBar(bar, brand, ids));
      const next = { hidden: step.hidden.map((index) => ids[index] ?? ''), brand: step.brand };
      if (sameFit(fitRef.current, next)) return;
      if (observed) beforeChange();
      fitRef.current = next;
      setFit(next);
    };
    update(false);
    const parts = bar.querySelectorAll<HTMLElement>(`${START_SELECTOR}, ${CONTROLS_SELECTOR}, ${ITEM_SELECTOR}, ${PROBE_SELECTOR}`);
    return observeResize([bar, brand, ...parts], () => update(true));
  }, [barRef, brandRef, orderKey, beforeChange]);

  return fit;
};

export { useTitleBarFit };
