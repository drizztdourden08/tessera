/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { choiceIndexOf } from './choice-index-of';

const usePickOnRelease = (rootRef: RefObject<HTMLElement | null>, enabled: boolean, pick: (index: number) => void): void => {
  useEffect(() => {
    if (!enabled) return undefined;
    const release = (event: PointerEvent) => {
      const under = document.elementFromPoint(event.clientX, event.clientY);
      const root = rootRef.current;
      if (!root || !under || !root.contains(under)) return;
      const index = choiceIndexOf(under);
      if (index !== null) pick(index);
    };
    window.addEventListener('pointerup', release, true);
    return () => window.removeEventListener('pointerup', release, true);
  }, [enabled, rootRef, pick]);
};

export { usePickOnRelease };
