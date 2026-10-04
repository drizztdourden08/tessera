/* @layer renderer-components @kind logic */
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { WIDTH_STEP, WIDTH_STEP_LARGE } from '../MasterDetailLayout.constants';
import { WIDTH_KEYS } from './key-width-of.constants';
import type { ListWidthLimits } from './list-width.type';

const keyWidthOf = (event: ReactKeyboardEvent<HTMLElement>, width: number, limits: ListWidthLimits): number | null => {
  const direction = WIDTH_KEYS[event.key];
  if (direction !== undefined) {
    const flip = getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1;
    return width + direction * flip * (event.shiftKey ? WIDTH_STEP_LARGE : WIDTH_STEP);
  }
  if (event.key === 'Home') return limits.min;
  if (event.key === 'End') return limits.max;
  if (event.key === 'Enter' || event.key === ' ') return limits.initial;
  return null;
};

export { keyWidthOf };
