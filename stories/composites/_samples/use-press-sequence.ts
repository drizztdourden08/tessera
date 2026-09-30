/* @layer stories @kind hook */
import { useEffect, useState } from 'react';

const STEP_MS = 380;

const usePressSequence = (sequence: readonly (readonly string[])[], running = true): readonly string[] => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % sequence.length), STEP_MS);
    return () => clearInterval(timer);
  }, [running, sequence.length]);

  return sequence[index] ?? [];
};

export { usePressSequence };
