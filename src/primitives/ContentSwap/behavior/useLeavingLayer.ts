/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useReducedMotion } from '../../dom/useReducedMotion';
import type { ContentSwapLayer, ContentSwapSequence } from '../ContentSwap.type';
import { nextLeaving } from './next-leaving';
import type { LeavingLayer } from './useLeavingLayer.type';

const useLeavingLayer = (
  swapKey: string | number,
  children: ReactNode,
  root: RefObject<HTMLElement | null>,
  sequence: ContentSwapSequence,
): LeavingLayer => {
  const last = useRef<ContentSwapLayer>({ key: swapKey, node: children });
  const [leaving, setLeaving] = useState<ContentSwapLayer | null>(null);
  const [entering, setEntering] = useState(false);
  const reduced = useReducedMotion(root);
  const outIn = sequence === 'out-in';

  useLayoutEffect(() => {
    const previous = last.current;
    last.current = { key: swapKey, node: children };
    if (previous.key === swapKey) return;
    setEntering(false);
    setLeaving((current) => (reduced ? null : nextLeaving(current, previous, outIn)));
  }, [swapKey, children, reduced, outIn]);

  const finish = () => {
    setLeaving(null);
    setEntering(outIn);
  };

  return { leaving, entering, finish };
};

export { useLeavingLayer };
