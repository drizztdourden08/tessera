/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import type { GuidedTourApi } from '../GuidedTour.type';
import { stageOf } from './stage-of';
import { useClickAdvance } from './useClickAdvance';
import { useHoleRect } from './useHoleRect';
import { useNodeBox } from './useNodeBox';
import { useScrollTarget } from './useScrollTarget';
import { useStepEntry } from './useStepEntry';
import { useTourFocus } from './useTourFocus';
import { useTourInert } from './useTourInert';
import { useTourKeys } from './useTourKeys';
import { useViewSize } from './useViewSize';

const useTourStage = (tour: GuidedTourApi) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const ringRef = useRef<HTMLElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [bubble, setBubble] = useState<HTMLElement | null>(null);
  const attach = useCallback((node: HTMLElement | null) => {
    rootRef.current = node;
    setRoot(node);
  }, []);
  const stage = stageOf(tour, useStepEntry(tour, root));
  const clickTarget = stage.click ? stage.target : null;
  const view = useViewSize(root);
  const hole = useHoleRect(stage.target, ringRef);
  const bubbleBox = useNodeBox(bubble, hole);
  useScrollTarget(stage.target, useReducedMotion(rootRef));
  useTourInert(root, clickTarget);
  useTourFocus(root, bubble);
  useTourKeys(tour, root, bubble, stage.click);
  useClickAdvance(clickTarget, tour.next);

  return { ...stage, attach, ringRef, setBubble, view, hole, bubbleBox };
};

export { useTourStage };
