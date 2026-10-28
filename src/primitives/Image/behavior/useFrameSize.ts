/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';
import type { ImageSize } from '../Image.type';

const useFrameSize = (active: boolean, frameRef: RefObject<HTMLElement | null>): ImageSize | null => {
  const [size, setSize] = useState<ImageSize | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!active || !frame) return undefined;
    const read = (): void => {
      const { width, height } = frame.getBoundingClientRect();
      setSize((before) => (before?.width === width && before.height === height ? before : { width, height }));
    };
    read();
    return observeResize([frame], read);
  }, [active, frameRef]);

  return active ? size : null;
};

export { useFrameSize };
