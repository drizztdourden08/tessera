/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { LABEL_GAP_PX, MARK_TEXT_SELECTOR } from '../SliderLabels.constants';
import { fitLabels } from './fit-labels';
import { sameFlags } from './same-flags';

const useLabelFit = (ref: RefObject<HTMLDivElement | null>, layoutKey: string): readonly boolean[] | null => {
  const [shown, setShown] = useState<readonly boolean[] | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const texts = [...root.querySelectorAll<HTMLElement>(MARK_TEXT_SELECTOR)];
    const measure = () => {
      const boxes = texts.map((text) => {
        const rect = text.getBoundingClientRect();
        return { start: rect.left, end: rect.right };
      });
      const next = fitLabels(boxes, LABEL_GAP_PX);
      setShown((previous) => (sameFlags(previous, next) ? previous : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    [root, ...texts].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ref, layoutKey]);

  return shown;
};

export { useLabelFit };
