/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useReducedMotion } from '../../dom/useReducedMotion';
import type { ContentSwapLayer } from '../ContentSwap.type';

const useLeavingLayer = (
  swapKey: string | number,
  children: ReactNode,
  root: RefObject<HTMLElement | null>,
): [ContentSwapLayer | null, () => void] => {
  const last = useRef<ContentSwapLayer>({ key: swapKey, node: children });
  const [leaving, setLeaving] = useState<ContentSwapLayer | null>(null);
  const reduced = useReducedMotion(root);

  useLayoutEffect(() => {
    const previous = last.current;
    last.current = { key: swapKey, node: children };
    if (previous.key === swapKey) return;
    setLeaving(reduced ? null : previous);
  }, [swapKey, children, reduced]);

  return [leaving, () => setLeaving(null)];
};

export { useLeavingLayer };
