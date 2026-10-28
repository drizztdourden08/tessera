/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';

const useFocusInside = (frameRef: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    const input = frameRef.current?.querySelector('input');
    input?.focus();
    input?.select();
  }, [frameRef]);
};

export { useFocusInside };
