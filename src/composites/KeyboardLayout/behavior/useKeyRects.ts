/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useRef } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
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
    return observeResize([root], measure);
  }, [size, listening]);

  return rootRef;
};

export { useKeyRects };
