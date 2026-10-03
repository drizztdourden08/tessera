/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';

const useFlashScroll = (rootRef: RefObject<HTMLElement | null>, flash: string | undefined, pageId: string) => {
  useEffect(() => {
    if (flash === undefined) return undefined;
    const frame = requestAnimationFrame(() => {
      rootRef.current?.querySelector(`[data-setting-key="${CSS.escape(flash)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => cancelAnimationFrame(frame);
  }, [rootRef, flash, pageId]);
};

export { useFlashScroll };
