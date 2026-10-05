/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';

const useRepeatTick = (everyMs: number | null): number => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (everyMs === null) return undefined;
    const timer = window.setInterval(() => setTick((count) => count + 1), everyMs);
    return () => window.clearInterval(timer);
  }, [everyMs]);
  return tick;
};

export { useRepeatTick };
