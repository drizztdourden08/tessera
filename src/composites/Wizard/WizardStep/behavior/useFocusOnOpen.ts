/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';

const useFocusOnOpen = <T extends HTMLElement>(enabled: boolean) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (enabled) ref.current?.focus({ preventScroll: true });
  }, [enabled]);
  return ref;
};

export { useFocusOnOpen };
