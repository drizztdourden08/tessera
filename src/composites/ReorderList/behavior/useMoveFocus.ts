/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { MoveFocus } from '../ReorderList.type';
import { itemOfKey } from './item-of-key';
import { mainOf } from './main-of';

const useMoveFocus = (listRef: RefObject<HTMLElement | null>): MoveFocus => {
  const pending = useRef<string | null>(null);
  const [message, setMessage] = useState('');
  useLayoutEffect(() => {
    const key = pending.current;
    if (key === null) return;
    pending.current = null;
    mainOf(itemOfKey(listRef.current, key))?.focus();
  });
  return {
    message,
    announce: setMessage,
    expect: (key) => {
      pending.current = key;
    },
  };
};

export { useMoveFocus };
