/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { FocusEvent } from 'react';
import { focusLeft } from '../../../primitives/dom/focus-left';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { useHeldTimeout } from '../../../primitives/dom/useHeldTimeout';
import type { ToastTimer } from './useToastTimer.type';

const useToastTimer = (duration: number | undefined, expire: () => void, shown: number): ToastTimer => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const backRef = useRef<Element | null>(null);
  useHeldTimeout(hovered || focused, duration, expire, shown);

  const onFocus = (event: FocusEvent<HTMLElement>) => {
    if (focusLeft(event)) backRef.current = event.relatedTarget;
    setFocused(true);
  };

  const returnFocus = (toast: HTMLElement | null) => {
    const back = backRef.current;
    if (!toast?.contains(toast.ownerDocument.activeElement) || !isHTMLElement(back) || !back.isConnected) return;
    back.focus();
  };

  return {
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus,
      onBlur: (event) => { if (focusLeft(event)) setFocused(false); },
    },
    returnFocus,
  };
};

export { useToastTimer };
