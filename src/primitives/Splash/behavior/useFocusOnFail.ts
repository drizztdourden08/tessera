/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { FIRST_ACTION } from '../Splash.constants';

const useFocusOnFail = (failed: boolean): RefObject<HTMLDivElement | null> => {
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!failed || !row.current) return;
    const button = row.current.querySelector<HTMLButtonElement>(FIRST_ACTION.primary) ?? row.current.querySelector<HTMLButtonElement>(FIRST_ACTION.any);
    button?.focus({ preventScroll: true });
  }, [failed]);
  return row;
};

export { useFocusOnFail };
