/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { FocusEvent } from 'react';
import { focusLeft } from '../../dom/focus-left';
import type { ToastTimer } from './useToastTimer.type';

const useToastTimer = (duration: number | undefined, dismiss: () => void): ToastTimer => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const held = hovered || focused;

  useEffect(() => {
    if (held || !duration || duration <= 0) return undefined;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [held, duration, dismiss]);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (focusLeft(event)) setFocused(false);
  };

  return {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur,
  };
};

export { useToastTimer };
