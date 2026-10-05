/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { useFoundTargets } from './useFoundTargets';
import type { TourStage } from './tour-internal.type';

const useClickAt = (root: HTMLElement | null, stage: TourStage): HTMLElement | null => {
  const clickTarget = stage.click ? stage.step?.clickTarget : undefined;
  const targets = useMemo(() => (clickTarget ? [clickTarget] : undefined), [clickTarget]);
  return useFoundTargets(root, targets, stage.step)[0] ?? null;
};

export { useClickAt };
