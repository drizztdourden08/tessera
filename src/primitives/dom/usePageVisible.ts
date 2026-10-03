/* @layer renderer-components @kind hook */
import { useCallback, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from './owner-document';

const usePageVisible = (ref: RefObject<Element | null>): boolean => {
  const subscribe = useCallback((notify: () => void) => {
    const doc = ownerDocumentOf(ref.current);
    doc.addEventListener('visibilitychange', notify);
    return () => doc.removeEventListener('visibilitychange', notify);
  }, [ref]);
  const snapshot = (): boolean => ownerDocumentOf(ref.current).visibilityState !== 'hidden';
  return useSyncExternalStore(subscribe, snapshot, () => true);
};

export { usePageVisible };
