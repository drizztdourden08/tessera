/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';

const useInertSet = (layer: HTMLElement | null, pick: (layer: HTMLElement) => HTMLElement[]): void => {
  useLayoutEffect(() => {
    if (!layer) return undefined;
    const made = pick(layer);
    made.forEach((el) => { el.inert = true; });
    return () => made.forEach((el) => { el.inert = false; });
  }, [layer, pick]);
};

export { useInertSet };
