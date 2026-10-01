/* @layer stories @kind hook */
import { useEffect, useRef, useState } from 'react';

const TICK_MS = 60;

const useSampler = (durationMs: number, onDone: () => void) => {
  const [progress, setProgress] = useState<number | null>(null);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    if (progress === null || progress >= 100) return undefined;
    const timer = setTimeout(() => {
      const next = Math.min(100, progress + (100 * TICK_MS) / durationMs);
      setProgress(next);
      if (next >= 100) done.current();
    }, TICK_MS);
    return () => clearTimeout(timer);
  }, [progress, durationMs]);
  return { progress, start: () => setProgress(0) };
};

export { useSampler };
