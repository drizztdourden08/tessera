/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import { ownerWindowOf } from '../../primitives/dom/owner-window';
import { sweepKeyAt } from './sweep-key-at';
import { sweepSession } from './sweep-session';
import { SWEEP_ATTRIBUTE } from './toggle-sweep.constants';
import type { SweepSession, ToggleSweep, ToggleSweepInput } from './toggle-sweep.type';

const swallowPointerClick = (event: MouseEvent<HTMLElement>): void => {
  if (event.detail === 0) return;
  event.preventDefault();
  event.stopPropagation();
};

const useToggleSweep = (input: ToggleSweepInput): ToggleSweep => {
  const [view, setView] = useState<Window | null>(null);
  const session = useRef<SweepSession | null>(null);
  const latest = useRef(input);
  useEffect(() => {
    latest.current = input;
  });

  const stop = useCallback(() => {
    const ended = session.current;
    session.current = null;
    setView(null);
    if (ended) latest.current.onEnd?.(ended.keys(), ended.value);
  }, []);

  useEffect(() => {
    if (!view) return undefined;
    const move = (event: globalThis.PointerEvent): void => {
      const key = sweepKeyAt(view, event.clientX, event.clientY);
      if (key !== undefined) session.current?.over(key);
    };
    view.addEventListener('pointermove', move);
    view.addEventListener('pointerup', stop);
    view.addEventListener('pointercancel', stop);
    return () => {
      view.removeEventListener('pointermove', move);
      view.removeEventListener('pointerup', stop);
      view.removeEventListener('pointercancel', stop);
    };
  }, [view, stop]);

  const bind = useCallback((key: string, current: boolean) => ({
    [SWEEP_ATTRIBUTE]: key,
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      session.current = sweepSession({ first: key, value: !current, order: latest.current.order, onSet: latest.current.onSet });
      setView(ownerWindowOf(event.currentTarget));
    },
    onClickCapture: swallowPointerClick,
  } as const), []);

  return { sweeping: view !== null, bind };
};

export { useToggleSweep };
