/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { measureScene } from './measure-scene';
import type { KeyRects } from '../../KeyboardLayout';
import type { TourScene } from '../ShortcutTour.type';

const useTourScene = () => {
  const viewportRef = useRef<HTMLElement | null>(null);
  const worldRef = useRef<HTMLElement | null>(null);
  const mouseRef = useRef<HTMLElement | null>(null);
  const [keyRects, setKeyRects] = useState<KeyRects>(() => new Map());
  const [scene, setScene] = useState<TourScene | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const world = worldRef.current;
    if (!viewport || !world) return undefined;
    const measure = (): void => setScene(measureScene(viewport, world, mouseRef.current));
    measure();
    return observeResize([viewport, world], measure);
  }, []);

  return { viewportRef, worldRef, mouseRef, keyRects, onKeyRects: setKeyRects, scene };
};

export { useTourScene };
