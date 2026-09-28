/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { MOUSE_TARGET } from '../ShortcutTour.constants';
import { rectsFor } from './rects-for';
import { tourFrames } from './tour-frames';
import { tourTargets } from './tour-targets';
import { tourView } from './tour-view';
import { travelMs } from './travel-ms';
import { useReducedMotion } from './useReducedMotion';
import { useTourClock } from './useTourClock';
import { useTourScene } from './useTourScene';
import type { KeyboardTarget } from '../../KeyboardLayout';
import type { TourParams } from '../ShortcutTour.type';

const useShortcutTour = (params: TourParams) => {
  const { keys, mouse, zoomOut, loop, size } = params;
  const { viewportRef, worldRef, mouseRef, keyRects, onKeyRects, scene } = useTourScene();
  const still = useReducedMotion(viewportRef);
  const targets = useMemo(() => tourTargets(keys, mouse, size), [keys.join(','), mouse, size]);
  const frames = useMemo(() => tourFrames({ count: targets.length, zoomOut, loop, still }), [targets, zoomOut, loop, still]);
  const rects = scene ? rectsFor(targets, keyRects, scene.mouse) : null;
  const frame = useTourClock(frames, loop && !still, rects !== null, () => travelMs(worldRef.current));
  const held = targets.slice(0, frame?.held ?? 0);

  return {
    viewportRef,
    worldRef,
    mouseRef,
    onKeyRects,
    view: tourView(frame, rects, scene),
    heldKeys: held.filter((target): target is KeyboardTarget => target !== MOUSE_TARGET),
    mouseHeld: held.includes(MOUSE_TARGET),
  };
};

export { useShortcutTour };
