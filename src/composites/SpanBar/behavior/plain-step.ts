/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import { SPAN_LANE_KEY_STEP } from '../SpanBar.constants';

const plainStep = (event: KeyboardEvent<HTMLElement>): number | undefined => {
  const modified = event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;
  return modified ? undefined : SPAN_LANE_KEY_STEP[event.key];
};

export { plainStep };
