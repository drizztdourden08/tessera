/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useReducedMotion } from '../../dom/useReducedMotion';
import type { ContentSwapLayer, ContentSwapSequence } from '../ContentSwap.type';
import { LEAVE_MARGIN_MS } from './leave-time.constants';
import { leaveTime } from './leave-time';
import { nextLeaving } from './next-leaving';
import type { LeavingLayer } from './useLeavingLayer.type';

const useLeavingLayer = (
  swapKey: string | number,
  children: ReactNode,
  root: RefObject<HTMLElement | null>,
  sequence: ContentSwapSequence,
): LeavingLayer => {
  const last = useRef<ContentSwapLayer>({ key: swapKey, node: children });
  const outRef = useRef<HTMLElement>(null);
  const [leaving, setLeaving] = useState<ContentSwapLayer | null>(null);
  const [entering, setEntering] = useState(false);
  const reduced = useReducedMotion(root);
  const outIn = sequence === 'out-in';

  const finish = useCallback(() => {
    setLeaving(null);
    setEntering(outIn);
  }, [outIn]);

  useLayoutEffect(() => {
    const previous = last.current;
    last.current = { key: swapKey, node: children };
    if (previous.key === swapKey) return;
    setEntering(false);
    setLeaving((current) => (reduced ? null : nextLeaving(current, previous, outIn)));
  }, [swapKey, children, reduced, outIn]);

  useLayoutEffect(() => {
    const element = outRef.current;
    if (leaving === null || element === null) return undefined;
    const wait = leaveTime(element);
    const timer = window.setTimeout(finish, wait === 0 ? 0 : wait + LEAVE_MARGIN_MS);
    return () => window.clearTimeout(timer);
  }, [leaving, finish]);

  return { leaving, entering, finish, outRef };
};

export { useLeavingLayer };
