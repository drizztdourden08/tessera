/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { CollapsedSide } from '../SplitPane.type';
import { startShareOf } from './start-share-of';
import { KEY_STEP } from './useSplitPane.constants';

const clamp = (value: number): number => Math.min(1, Math.max(0, value));

const useSplitPane = (defaultRatio: number, snapAt: number, defaultCollapsed: CollapsedSide = 'none') => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(defaultRatio);
  const [collapsed, setCollapsed] = useState<CollapsedSide>(defaultCollapsed);
  const [dragging, setDragging] = useState(false);

  const apply = useCallback((next: number) => {
    if (next < snapAt) {
      setCollapsed('start');
      return;
    }
    if (next > 1 - snapAt) {
      setCollapsed('end');
      return;
    }
    setCollapsed('none');
    setRatio(clamp(next));
  }, [snapAt]);

  const ratioAt = useCallback((clientX: number): number => {
    const track = trackRef.current;
    if (!track) return ratio;
    const rect = track.getBoundingClientRect();
    return rect.width > 0 ? (clientX - rect.left) / rect.width : ratio;
  }, [ratio]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    apply(ratioAt(event.clientX));
  }, [apply, dragging, ratioAt]);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }, []);

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    const current = startShareOf(collapsed, ratio);
    if (event.key === 'ArrowLeft') apply(current - KEY_STEP);
    else if (event.key === 'ArrowRight') apply(current + KEY_STEP);
    else if (event.key === 'Home') setCollapsed('start');
    else if (event.key === 'End') setCollapsed('end');
    else if (event.key === 'Enter' || event.key === ' ') { setCollapsed('none'); setRatio(defaultRatio); }
    else return;
    event.preventDefault();
  }, [apply, collapsed, defaultRatio, ratio]);

  const expand = useCallback(() => {
    setCollapsed('none');
    setRatio(defaultRatio);
  }, [defaultRatio]);

  return {
    trackRef, ratio, collapsed, dragging, expand,
    handlePointerDown, handlePointerMove, endDrag, handleKeyDown,
  };
};

export { useSplitPane };
