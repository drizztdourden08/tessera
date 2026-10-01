/* @layer renderer-components @kind hook */
import { useCallback, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from './owner-window';
import { REDUCED_MOTION_QUERY } from './reduced-motion.constants';

const useReducedMotion = (ref: RefObject<Element | null>): boolean => {
  const subscribe = useCallback((notify: () => void) => {
    const node = ref.current;
    if (!node) return () => undefined;
    const query = ownerWindowOf(node).matchMedia(REDUCED_MOTION_QUERY);
    query.addEventListener('change', notify);
    return () => query.removeEventListener('change', notify);
  }, [ref]);
  const snapshot = (): boolean => {
    const node = ref.current;
    return node ? ownerWindowOf(node).matchMedia(REDUCED_MOTION_QUERY).matches : false;
  };
  return useSyncExternalStore(subscribe, snapshot, () => false);
};

export { useReducedMotion };
