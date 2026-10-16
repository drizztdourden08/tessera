/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent } from 'react';

const useHeldTimeout = (held: boolean, duration: number | undefined, onEnd: () => void, restart?: unknown): void => {
  const end = useEffectEvent(onEnd);
  useEffect(() => {
    if (held || !duration || duration <= 0) return undefined;
    const timer = setTimeout(() => end(), duration);
    return () => clearTimeout(timer);
  }, [held, duration, restart]);
};

export { useHeldTimeout };
