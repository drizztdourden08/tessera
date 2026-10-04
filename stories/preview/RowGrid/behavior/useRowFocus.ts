/* @layer stories @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { PendingFocus, RowFocus } from '../RowGrid.type';
import { focusPending } from './focus-pending';

const useRowFocus = (rootRef: RefObject<HTMLElement | null>): RowFocus => {
  const pending = useRef<PendingFocus | null>(null);
  const [message, setMessage] = useState('');
  useLayoutEffect(() => {
    const root = rootRef.current;
    const next = pending.current;
    if (!root || !next) return;
    pending.current = null;
    focusPending(root, next);
  });
  return {
    message,
    announce: setMessage,
    expect: (next) => {
      pending.current = next;
    },
  };
};

export { useRowFocus };
