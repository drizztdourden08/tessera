/* @layer renderer-components @kind logic */
import type { KeyboardEvent, KeyboardEventHandler } from 'react';

const enterKeyDown = (
  onKeyDown: KeyboardEventHandler<HTMLInputElement> | undefined,
  onEnter: ((value: string) => void) | undefined,
): KeyboardEventHandler<HTMLInputElement> | undefined => {
  if (onEnter === undefined) return onKeyDown;
  return (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    onEnter(event.currentTarget.value);
  };
};

export { enterKeyDown };
