/* @layer renderer-components @kind logic */
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { keyActionOf } from './key-action-of';
import type { ResizeOptions } from './resize-options.type';
import { startValueOf } from './start-value-of';

const resizeKeyDown = (event: ReactKeyboardEvent<HTMLElement>, options: ResizeOptions): void => {
  if (event.defaultPrevented) return;
  const from = startValueOf(options);
  const action = keyActionOf(event, from, {
    ...options, canReset: options.onReset !== undefined, canCollapse: options.onCollapse !== undefined,
  });
  if (action === null) return;
  event.preventDefault();
  if (action.kind === 'reset') options.onReset?.();
  else if (action.kind === 'collapse') options.onCollapse?.();
  else if (action.to !== from) {
    options.onResize(action.to, { from, by: 'key' });
    options.onResizeEnd?.(action.to);
  }
};

export { resizeKeyDown };
