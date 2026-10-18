/* @layer renderer-components @kind logic */
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { keyActionOf } from './key-action-of';
import type { ResizeOptions } from './resize-options.type';
import { runKeyAction } from './run-key-action';
import { startValueOf } from './start-value-of';

const resizeKeyDown = (event: ReactKeyboardEvent<HTMLElement>, options: ResizeOptions): void => {
  if (event.defaultPrevented) return;
  const from = startValueOf(options);
  const action = keyActionOf(event, from, { ...options, canReset: options.onReset !== undefined });
  if (action === null) return;
  event.preventDefault();
  runKeyAction(action, from, options);
};

export { resizeKeyDown };
