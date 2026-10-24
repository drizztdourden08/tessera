/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { SwatchFocus } from '../SwatchGrid.type';
import { swatchOfKey } from './swatch-of-key';

const useSwatchFocus = (listRef: RefObject<HTMLElement | null>): SwatchFocus => {
  const waiting = useRef<string | null>(null);
  const [message, setMessage] = useState('');
  useLayoutEffect(() => {
    if (waiting.current === null) return;
    swatchOfKey(listRef.current, waiting.current)?.focus();
    waiting.current = null;
  });
  return {
    message,
    announce: setMessage,
    expect: (id) => {
      waiting.current = id;
    },
  };
};

export { useSwatchFocus };
