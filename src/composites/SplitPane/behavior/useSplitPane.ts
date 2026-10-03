/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { CollapsedSide } from '../SplitPane.type';
import { dragOriginOf } from './drag-origin-of';
import type { DragOrigin } from './drag-origin.type';
import { keyStepOf } from './key-step-of';
import { settleShare } from './settle-share';
import { shareAt } from './share-at';
import type { SplitLimits } from './split-limits.type';
import { startShareOf } from './start-share-of';
import { stepShare } from './step-share';
import { COMMAND_KEYS } from './useSplitPane.constants';
import type { SplitPaneOptions } from './useSplitPane.type';

const useSplitPane = (options: SplitPaneOptions) => {
  const { orientation, defaultRatio, defaultCollapsed, minRatio, maxRatio, snapAt } = options;
  const limits = useMemo<SplitLimits>(() => ({ min: minRatio, max: maxRatio, snapAt }), [maxRatio, minRatio, snapAt]);
  const trackRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<DragOrigin | null>(null);
  const [ratio, setRatio] = useState(defaultRatio);
  const [collapsed, setCollapsed] = useState<CollapsedSide>(defaultCollapsed);
  const [dragging, setDragging] = useState(false);

  const apply = useCallback((next: number) => {
    const settled = settleShare(next, limits, ratio);
    setCollapsed(settled.collapsed);
    setRatio(settled.ratio);
  }, [limits, ratio]);

  const expand = useCallback(() => {
    setCollapsed('none');
    setRatio(defaultRatio);
  }, [defaultRatio]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    originRef.current = dragOriginOf(event, trackRef.current, orientation, startShareOf(collapsed, ratio));
    setDragging(true);
  }, [collapsed, orientation, ratio]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (originRef.current) apply(shareAt(originRef.current, event, orientation));
  }, [apply, orientation]);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    originRef.current = null;
    setDragging(false);
  }, []);

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = keyStepOf(event, orientation);
    const command = COMMAND_KEYS[event.key];
    if (step !== null) apply(stepShare({ collapsed, ratio }, step, limits));
    else if (command === 'home') apply(0);
    else if (command === 'end') apply(1);
    else if (command === 'reset') expand();
    else return;
    event.preventDefault();
  }, [apply, collapsed, expand, limits, orientation, ratio]);

  return {
    trackRef, ratio, collapsed, dragging, limits, expand,
    handlePointerDown, handlePointerMove, endDrag, handleKeyDown,
  };
};

export { useSplitPane };
