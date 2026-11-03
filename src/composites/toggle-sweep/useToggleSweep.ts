/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import { ownerWindowOf } from '../../primitives/dom/owner-window';
import { sweepKeyAt } from './sweep-key-at';
import { sweepStart } from './sweep-start';
import { NO_KEYS, SWEEP_ATTRIBUTE } from './toggle-sweep.constants';
import type { SweepSession, ToggleSweep, ToggleSweepInput } from './toggle-sweep.type';

const useToggleSweep = (input: ToggleSweepInput): ToggleSweep => {
  const [view, setView] = useState<Window | null>(null);
  const [touched, setTouched] = useState<readonly string[]>(NO_KEYS);
  const session = useRef<SweepSession | null>(null);
  const swept = useRef(false);
  const latest = useRef(input);
  useEffect(() => {
    latest.current = input;
  });

  const stop = useCallback(() => {
    const ended = session.current;
    session.current = null;
    setView(null);
    setTouched(NO_KEYS);
    if (ended) latest.current.onEnd?.(ended.keys(), ended.value);
  }, []);

  useEffect(() => {
    if (!view) return undefined;
    const move = (event: globalThis.PointerEvent): void => {
      const key = sweepKeyAt(view, event.clientX, event.clientY);
      const now = session.current;
      if (key !== undefined && now?.over(key)) setTouched(now.keys());
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
      session.current = sweepStart(key, current, event, latest.current);
      swept.current = session.current !== null;
      if (!session.current) return;
      setTouched(session.current.keys());
      setView(ownerWindowOf(event.currentTarget));
    },
    onClickCapture: (event: MouseEvent<HTMLElement>) => {
      if (!swept.current || event.detail === 0) return;
      event.preventDefault();
      event.stopPropagation();
    },
  } as const), []);

  return { sweeping: view !== null, touched, value: view === null ? null : (session.current?.value ?? null), bind };
};

export { useToggleSweep };
