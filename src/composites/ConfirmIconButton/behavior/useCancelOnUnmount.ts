/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const useCancelOnUnmount = <T>(open: RefObject<T | null>, onCancel: ((value: T) => void) | undefined): void => {
  const latest = useRef(onCancel);
  latest.current = onCancel;
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      queueMicrotask(() => {
        const value = open.current;
        if (mounted.current || value === null) return;
        open.current = null;
        latest.current?.(value);
      });
    };
  }, [open]);
};

export { useCancelOnUnmount };
