/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { focusLeft } from '../../../primitives/dom/focus-left';
import { cancelHide } from './cancel-hide';
import type { HideTimer } from './hide-timer.type';
import { scheduleHide } from './schedule-hide';
import { useAltReveal } from './useAltReveal';
import { usePeekMenuClose } from './usePeekMenuClose';
import { usePeekZone } from './usePeekZone';
import type { Peek } from './usePeek.type';

const usePeek = (tucked: boolean, barRef: RefObject<HTMLElement | null>, follow: boolean, menuOpen = false): Peek => {
  const [peeking, setPeeking] = useState(false);
  const [focused, setFocused] = useState(false);
  const returnRef = useRef<Element | null>(null);
  const timer: HideTimer = useRef(undefined);
  const inside = useRef(false);
  const handling = tucked && !menuOpen;
  useAltReveal(handling, barRef, returnRef);
  usePeekZone({ tucked, follow, menuOpen, barRef, timer, setPeeking });
  usePeekMenuClose({ tucked, menuOpen, inside, timer, setPeeking });
  useEffect(() => () => cancelHide(timer), []);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (focusLeft(event)) setFocused(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !handling) return;
    event.preventDefault();
    const back = returnRef.current;
    returnRef.current = null;
    if (isHTMLElement(back) && back.isConnected) back.focus();
    else if (isHTMLElement(event.target)) event.target.blur();
  };

  return {
    peeking,
    focused,
    handlers: {
      onMouseEnter: () => {
        inside.current = true;
        cancelHide(timer);
      },
      onMouseLeave: () => {
        inside.current = false;
        if (handling) scheduleHide(timer, setPeeking);
      },
      onFocus: () => setFocused(true),
      onBlur,
      onKeyDown,
    },
  };
};

export { usePeek };
