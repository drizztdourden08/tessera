/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { Size } from '../DockLayout.type';

const useStageSize = (ref: RefObject<HTMLElement | null>): Size | null => {
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = (): void => {
      const { width, height } = el.getBoundingClientRect();
      setSize((prev) => (prev?.width === width && prev.height === height ? prev : { width, height }));
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
};

export { useStageSize };
