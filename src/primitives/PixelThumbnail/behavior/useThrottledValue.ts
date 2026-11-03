/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';

const useThrottledValue = <T,>(value: T, gapMs: number): T => {
  const [shown, setShown] = useState(value);
  const lastAt = useRef(0);
  useEffect(() => {
    if (gapMs <= 0) return undefined;
    const wait = Math.max(0, lastAt.current + gapMs - Date.now());
    const timer = setTimeout(() => {
      lastAt.current = Date.now();
      setShown(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, gapMs]);
  return gapMs <= 0 ? value : shown;
};

export { useThrottledValue };
