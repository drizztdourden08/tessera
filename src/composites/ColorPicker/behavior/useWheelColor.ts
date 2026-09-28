/* @layer renderer-components @kind hook */
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { hexToRgb } from './color-math';
import type { WheelColor } from './useWheelColor.type';

const useWheelColor = (value: string, alpha: number, disableAlpha: boolean) => {
  const external = useMemo<WheelColor>(
    () => (disableAlpha ? value : { ...hexToRgb(value), a: alpha }),
    [disableAlpha, value, alpha],
  );

  const [seed, setSeed] = useState<WheelColor>(external);
  const dragging = useRef(false);

  const latest = useRef<WheelColor>(external);
  latest.current = external;

  useEffect(() => {
    if (!dragging.current) setSeed(external);
  }, [external]);

  useEffect(() => {
    const release = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setSeed(latest.current);
    };
    window.addEventListener('mouseup', release);
    return () => window.removeEventListener('mouseup', release);
  }, []);

  const beginDrag = useCallback(() => { dragging.current = true; }, []);

  const followWheel = useCallback((c: WheelColor) => {
    if (dragging.current) setSeed(c);
  }, []);

  return { seed, beginDrag, followWheel };
};

export { useWheelColor };
