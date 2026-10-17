/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { mediaWidth } from './media-width';
import type { MediaWidthInput } from './media-width.type';

const useMediaWidth = (rowRef: RefObject<HTMLElement | null>, input: MediaWidthInput): CSSProperties | undefined => {
  const [height, setHeight] = useState(0);
  const measured = input.media != null && input.width === undefined;
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!measured || !row) return undefined;
    const read = () => setHeight(row.clientHeight);
    read();
    return observeResize([row], read);
  }, [measured, rowRef]);
  if (input.media == null) return undefined;
  return { '--list-item-media-w': `${mediaWidth(input, height)}px` } as CSSProperties;
};

export { useMediaWidth };
