/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { isNode } from '../../../primitives/Portal/behavior/is-node';
import { PEEK_ZONE_PX } from '../WindowTitleBar.constants';
import { useAltReveal } from './useAltReveal';
import type { Peek } from './usePeek.type';

const usePeek = (tucked: boolean, barRef: RefObject<HTMLElement | null>, follow: boolean): Peek => {
  const [peeking, setPeeking] = useState(false);
  const [focused, setFocused] = useState(false);
  const returnRef = useRef<Element | null>(null);
  useAltReveal(tucked, barRef, returnRef);

  useEffect(() => {
    if (!tucked || !follow) {
      setPeeking(false);
      return undefined;
    }
    const view = barRef.current?.ownerDocument.defaultView ?? window;
    const onMove = (event: MouseEvent) => {
      const bar = barRef.current;
      if (bar?.contains(event.target as Node)) return;
      const top = bar?.parentElement?.getBoundingClientRect().top ?? 0;
      const depth = event.clientY - top;
      setPeeking(depth >= 0 && depth <= PEEK_ZONE_PX);
    };
    view.addEventListener('mousemove', onMove);
    return () => view.removeEventListener('mousemove', onMove);
  }, [tucked, follow, barRef]);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next === null || !isNode(next) || !event.currentTarget.contains(next)) setFocused(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !tucked) return;
    const back = returnRef.current;
    returnRef.current = null;
    if (isHTMLElement(back) && back.isConnected) back.focus();
    else if (isHTMLElement(event.target)) event.target.blur();
  };

  return {
    peeking,
    focused,
    handlers: {
      onMouseLeave: () => { if (tucked) setPeeking(false); },
      onFocus: () => setFocused(true),
      onBlur,
      onKeyDown,
    },
  };
};

export { usePeek };
