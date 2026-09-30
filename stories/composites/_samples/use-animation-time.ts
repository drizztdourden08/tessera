/* @layer stories @kind hook */
import { useEffect, useRef, useState } from 'react';

const useAnimationTime = (running = true): number => {
  const [seconds, setSeconds] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const start = performance.now() - elapsed.current * 1000;
    let frame = requestAnimationFrame(function tick(now) {
      elapsed.current = (now - start) / 1000;
      setSeconds(elapsed.current);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [running]);

  return seconds;
};

export { useAnimationTime };
