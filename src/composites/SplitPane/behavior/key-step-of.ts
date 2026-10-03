/* @layer renderer-components @kind logic */
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { SplitOrientation } from '../SplitPane.type';
import { KEY_STEP, KEY_STEP_LARGE, STEP_KEYS } from './useSplitPane.constants';

const keyStepOf = (event: ReactKeyboardEvent<HTMLElement>, orientation: SplitOrientation): number | null => {
  const direction = STEP_KEYS[orientation][event.key];
  if (direction === undefined) return null;
  const flip = orientation === 'horizontal' && getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1;
  return direction * flip * (event.shiftKey ? KEY_STEP_LARGE : KEY_STEP);
};

export { keyStepOf };
