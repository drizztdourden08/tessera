/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import { secondsUntil } from './seconds-until';
import { TICK_MS } from '../RetryButton.constants';

const useSecondsLeft = (until: number | null | undefined): number => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    setNow(Date.now());
    if (secondsUntil(until, Date.now()) <= 0) return undefined;
    const timer = setInterval(() => {
      const at = Date.now();
      setNow(at);
      if (secondsUntil(until, at) <= 0) clearInterval(timer);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [until]);
  return secondsUntil(until, now);
};

export { useSecondsLeft };
