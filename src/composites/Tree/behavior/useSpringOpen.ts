/* @layer renderer-components @kind hook */
import { useEffect } from 'react';

const useSpringOpen = (key: string | null, delay: number, open: (key: string) => void): void => {
  useEffect(() => {
    if (key === null || delay <= 0) return undefined;
    const timer = setTimeout(() => open(key), delay);
    return () => clearTimeout(timer);
  }, [key, delay, open]);
};

export { useSpringOpen };
