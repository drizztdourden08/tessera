/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { measureKeys } from './measure-keys';
import type { KeyboardSize, KeyRects } from '../KeyboardLayout.type';

const useKeyRects = (onKeyRects: ((rects: KeyRects) => void) | undefined, size: KeyboardSize) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const reportRef = useRef(onKeyRects);
  const listening = onKeyRects !== undefined;

  useEffect(() => {
    reportRef.current = onKeyRects;
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !listening) return undefined;
    const measure = (): void => reportRef.current?.(measureKeys(root));
    measure();
    const Observer = (ownerWindowOf(root) as Window & typeof globalThis).ResizeObserver;
    const observer = new Observer(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [size, listening]);

  return rootRef;
};

export { useKeyRects };
