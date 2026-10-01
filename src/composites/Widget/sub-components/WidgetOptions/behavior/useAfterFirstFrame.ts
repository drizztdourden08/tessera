/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';

const useAfterFirstFrame = (): boolean => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return ready;
};

export { useAfterFirstFrame };
