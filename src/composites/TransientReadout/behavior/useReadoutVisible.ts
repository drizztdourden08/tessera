/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const useReadoutVisible = (value: ReactNode, showMs: number): boolean => {
  const [visible, setVisible] = useState(false);
  const previous = useRef(value);

  useEffect(() => {
    if (Object.is(previous.current, value)) return undefined;
    previous.current = value;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), showMs);
    return () => window.clearTimeout(timer);
  }, [value, showMs]);

  return visible;
};

export { useReadoutVisible };
