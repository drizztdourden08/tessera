/* @layer renderer-components @kind logic */
import type { Ref } from 'react';
import type { RowRefDetach } from './attach-ref.type';

const attachRef = (target: Ref<HTMLElement>, element: HTMLElement): RowRefDetach | null => {
  if (typeof target === 'function') {
    const cleanup: unknown = target(element);
    return typeof cleanup === 'function' ? (cleanup as RowRefDetach) : () => { target(null); };
  }
  if (target) {
    target.current = element;
    return () => { target.current = null; };
  }
  return null;
};

export { attachRef };
