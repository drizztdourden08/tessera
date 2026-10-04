/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { FocusEvent, RefObject } from 'react';
import { focusLeft } from '../../dom/focus-left';
import { useDismissListeners } from '../../Portal/behavior/useDismissListeners';
import type { TooltipOpen } from './useTooltipOpen.type';

const useTooltipOpen = (anchorRef: RefObject<HTMLElement | null>, bubbleRef: RefObject<HTMLElement | null>, hasContent: boolean): TooltipOpen => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const open = (hover || focus) && !dismissed && hasContent;

  useEffect(() => {
    if (!hover && !focus) setDismissed(false);
  }, [hover, focus]);

  useDismissListeners({ open, onClose: () => setDismissed(true), contentRef: bubbleRef, triggerRef: anchorRef });

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (focusLeft(event)) setFocus(false);
  };

  return {
    open,
    handlers: {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onFocus: () => setFocus(true),
      onBlur,
    },
  };
};

export { useTooltipOpen };
