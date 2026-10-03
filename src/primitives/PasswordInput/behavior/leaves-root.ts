/* @layer renderer-components @kind util */
import type { FocusEvent } from 'react';

const leavesRoot = (event: FocusEvent<HTMLElement>): boolean => {
  const next = event.relatedTarget;
  return next === null || !('nodeType' in next) || !event.currentTarget.contains(next);
};

export { leavesRoot };
