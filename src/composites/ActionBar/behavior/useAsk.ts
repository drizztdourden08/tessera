/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { ACTION_ID_ATTRIBUTE, MORE_CLASS } from '../ActionBar.constants';
import type { ActionItem } from '../ActionBar.type';

const focusBack = (bar: HTMLElement | null, id: string): void => {
  const own = bar?.querySelector<HTMLElement>(`[${ACTION_ID_ATTRIBUTE}="${CSS.escape(id)}"]`);
  (own ?? bar?.querySelector<HTMLElement>(`.${MORE_CLASS}`))?.focus();
};

const useAsk = (barRef: RefObject<HTMLElement | null>) => {
  const [asking, setAsking] = useState<ActionItem | null>(null);
  const backTo = useRef<string | null>(null);

  useEffect(() => {
    if (asking || backTo.current === null) return;
    focusBack(barRef.current, backTo.current);
    backTo.current = null;
  }, [asking, barRef]);

  const settle = (run: boolean): void => {
    if (!asking) return;
    backTo.current = asking.id;
    setAsking(null);
    if (run) asking.onSelect();
  };

  return { asking, ask: setAsking, confirm: () => settle(true), cancel: () => settle(false) };
};

export { useAsk };
