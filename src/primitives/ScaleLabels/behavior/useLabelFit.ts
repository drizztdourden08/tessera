/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { thinLabels } from '../../value-rule/thin-labels';
import { LABEL_GAP_PX, MARK_TEXT_SELECTOR } from '../ScaleLabels.constants';
import type { ScaleOrientation } from '../ScaleLabels.type';
import { labelBoxes } from './label-boxes';
import { sameFlags } from './same-flags';

const useLabelFit = (ref: RefObject<HTMLDivElement | null>, layoutKey: string, orientation: ScaleOrientation, thin: boolean): readonly boolean[] | null => {
  const [shown, setShown] = useState<readonly boolean[] | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !thin) {
      setShown(null);
      return undefined;
    }
    const texts = [...root.querySelectorAll<HTMLElement>(MARK_TEXT_SELECTOR)];
    const measure = () => {
      const next = thinLabels(labelBoxes(texts, orientation), LABEL_GAP_PX);
      setShown((previous) => (sameFlags(previous, next) ? previous : next));
    };
    measure();
    return observeResize([root, ...texts], measure);
  }, [ref, layoutKey, orientation, thin]);

  return shown;
};

export { useLabelFit };
