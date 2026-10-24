/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { LONG_PRESS_DELAY } from '../ContextMenu.constants';
import type { ContextMenuPoint } from '../ContextMenu.type';
import { movedPastSlop } from './moved-past-slop';
import type { LongPressHandlers, UseLongPressParams } from './useLongPress.type';

const useLongPress = (params: UseLongPressParams): LongPressHandlers => {
  const { enabled, onPress } = params;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef<ContextMenuPoint | null>(null);
  const fired = useRef(false);

  const cancel = (): void => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    start.current = null;
  };

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  return {
    onPointerDown: (event) => {
      if (!enabled || event.pointerType === 'mouse' || !event.currentTarget.contains(event.target as Node)) return;
      const at = { x: event.clientX, y: event.clientY };
      const target = event.target;
      cancel();
      fired.current = false;
      start.current = at;
      timer.current = setTimeout(() => {
        timer.current = null;
        fired.current = true;
        onPress(at, target);
      }, LONG_PRESS_DELAY);
    },
    onPointerMove: (event) => {
      if (start.current !== null && movedPastSlop(start.current, { x: event.clientX, y: event.clientY })) cancel();
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onClickCapture: (event) => {
      if (!fired.current) return;
      fired.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };
};

export { useLongPress };
