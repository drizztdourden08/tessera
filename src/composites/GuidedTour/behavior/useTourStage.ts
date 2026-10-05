/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import type { GuidedTourApi, TourTarget } from '../GuidedTour.type';
import { stageOf } from './stage-of';
import { tourReach } from './tour-reach';
import { useBubblePlace } from './useBubblePlace';
import { useClickAdvance } from './useClickAdvance';
import { useClickAt } from './useClickAt';
import { useFoundTargets } from './useFoundTargets';
import { useHeldStep } from './useHeldStep';
import { useSameNodes } from './useSameNodes';
import { useScrollTarget } from './useScrollTarget';
import { useSpotlight } from './useSpotlight';
import { useTourFocus } from './useTourFocus';
import { useTourInert } from './useTourInert';
import { useTourKeys } from './useTourKeys';

const useTourStage = (tour: GuidedTourApi, keep: readonly TourTarget[] | undefined) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [bubble, setBubble] = useState<HTMLElement | null>(null);
  const attach = useCallback((node: HTMLElement | null) => {
    rootRef.current = node;
    setRoot(node);
  }, []);
  const stage = stageOf(tour, useHeldStep(tour));
  const kept = useFoundTargets(root, keep, tour.index);
  const clickAt = useClickAt(root, stage);
  const reach = tourReach(stage, kept, clickAt);
  const reachable = useSameNodes(reach.reachable);
  const spot = useSpotlight(root, stage.target, useSameNodes(reach.holes));
  const bubbled = useBubblePlace(bubble, stage.step, stage.target, spot);
  useScrollTarget(stage.target, useReducedMotion(rootRef));
  useTourInert(root, reachable);
  useTourFocus(root, bubble);
  useTourKeys(tour, root, bubble, stage.waits);
  useClickAdvance(clickAt ?? (stage.click ? stage.target : null), tour.next);

  return { ...stage, ...bubbled, attach, setBubble, spot };
};

export { useTourStage };
