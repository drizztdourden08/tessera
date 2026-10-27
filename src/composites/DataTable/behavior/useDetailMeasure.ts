/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { RefObject } from 'react';

const useDetailMeasure = (ref: RefObject<HTMLElement | null>, onHeight: ((height: number) => void) | undefined): void => {
  useEffect(() => {
    const node = ref.current;
    if (!node || !onHeight) return undefined;
    const read = () => onHeight(node.offsetHeight);
    read();
    return observeResize([node], read);
  }, [ref, onHeight]);
};

export { useDetailMeasure };
