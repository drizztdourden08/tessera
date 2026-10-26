/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { FocusEvent, MouseEvent, RefObject } from 'react';
import { focusLeft } from '../../dom/focus-left';
import { ownerDocumentOf } from '../../dom/owner-document';
import { keyboardFocus } from '../../hint/keyboard-focus';
import { useDismissListeners } from '../../Portal/behavior/useDismissListeners';
import { nextTooltipState } from './next-tooltip-state';
import { pointerMoved } from './pointer-moved';
import { TOOLTIP_CLOSED } from './tooltip-state.constants';
import { trackPointer } from './track-pointer';
import type { TooltipEvent } from './tooltip-state.type';
import { useCloseOnScroll } from './useCloseOnScroll';
import type { TooltipOpen, TooltipPointer } from './useTooltipOpen.type';

const useTooltipOpen = (
  anchorRef: RefObject<HTMLElement | null>, bubbleRef: RefObject<HTMLElement | null>, hasContent: boolean, onPointer?: TooltipPointer,
): TooltipOpen => {
  const [state, setState] = useState(TOOLTIP_CLOSED);
  const send = (event: TooltipEvent) => setState((before) => nextTooltipState(before, event));
  const open = (state.hover || state.focus) && !state.dismissed && hasContent;

  useDismissListeners({ open, onClose: () => send('dismiss'), contentRef: bubbleRef, triggerRef: anchorRef });
  useEffect(() => trackPointer(ownerDocumentOf(anchorRef.current)), [anchorRef]);
  useCloseOnScroll(state.hover, anchorRef, () => send('scroll'));

  const moved = (event: MouseEvent<HTMLElement>) => pointerMoved(ownerDocumentOf(anchorRef.current), event.clientX, event.clientY);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (focusLeft(event)) send('blur');
  };

  const onFocus = (event: FocusEvent<HTMLElement>) => {
    if (keyboardFocus(event.target)) send('focus');
  };

  const onMouseEnter = (event: MouseEvent<HTMLElement>) => {
    onPointer?.(event);
    if (moved(event)) send('enter');
  };

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    onPointer?.(event);
    if (!state.hover && moved(event)) send('enter');
  };

  return {
    open,
    hover: state.hover,
    handlers: {
      onMouseEnter,
      onMouseMove,
      onMouseLeave: () => send('leave'),
      onMouseDown: () => send('press'),
      onFocus,
      onBlur,
    },
  };
};

export { useTooltipOpen };
