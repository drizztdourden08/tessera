/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { GuidedTourApi, GuidedTourOptions } from '../GuidedTour.type';
import { clampIndex } from './clamp-index';
import type { TourMove, TourPosition } from './tour-internal.type';
import { tourMove } from './tour-move';
import { tourShortcuts } from './tour-shortcuts';

const useGuidedTour = (options: GuidedTourOptions): GuidedTourApi => {
  const { steps, step, open } = options;
  const { tour: words } = useTesseraStrings();
  const [own, setOwn] = useState<TourPosition>({ open: false, index: 0 });
  const position: TourPosition = { open: (open ?? own.open) && steps.length > 0, index: clampIndex(step ?? own.index, steps.length) };
  const latest = useRef({ position, options });
  latest.current = { position, options };

  const apply = useCallback((move: TourMove) => {
    const { position: at, options: given } = latest.current;
    const out = tourMove(at, move, given.steps.length);
    latest.current = { ...latest.current, position: { open: out.open, index: out.index } };
    setOwn({ open: out.open, index: out.index });
    if (out.index !== at.index) given.onStepChange?.(out.index);
    if (out.open !== at.open) given.onOpenChange?.(out.open);
    if (out.finished) given.onFinish?.();
  }, []);

  const moves = useMemo(() => ({
    start: (at = 0) => apply({ type: 'start', at }),
    next: () => apply({ type: 'next' }),
    back: () => apply({ type: 'back' }),
    goTo: (index: number) => apply({ type: 'go', index }),
    close: () => apply({ type: 'close' }),
  }), [apply]);
  const shortcuts = useMemo(() => tourShortcuts(words), [words]);

  return useMemo(() => ({
    ...moves,
    steps,
    open: position.open,
    index: position.index,
    current: position.open ? steps[position.index] ?? null : null,
    total: steps.length,
    shortcuts,
  }), [moves, steps, position.open, position.index, shortcuts]);
};

export { useGuidedTour };
