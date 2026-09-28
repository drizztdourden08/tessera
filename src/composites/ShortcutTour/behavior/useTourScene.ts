/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
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
    const Observer = (ownerWindowOf(viewport) as Window & typeof globalThis).ResizeObserver;
    const observer = new Observer(measure);
    observer.observe(viewport);
    observer.observe(world);
    return () => observer.disconnect();
  }, []);

  return { viewportRef, worldRef, mouseRef, keyRects, onKeyRects: setKeyRects, scene };
};

export { useTourScene };
