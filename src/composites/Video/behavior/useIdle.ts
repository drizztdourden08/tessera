/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { IDLE_MS } from '../Video.constants';

const useIdle = (active: boolean) => {
  const [idle, setIdle] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const wake = useCallback(() => {
    setIdle(false);
    clearTimeout(timer.current);
    if (active) timer.current = setTimeout(() => setIdle(true), IDLE_MS);
  }, [active]);

  const sleep = useCallback(() => {
    clearTimeout(timer.current);
    if (active) setIdle(true);
  }, [active]);

  useEffect(() => {
    wake();
    return () => clearTimeout(timer.current);
  }, [wake]);

  return { idle: active && idle, wake, sleep };
};

export { useIdle };
