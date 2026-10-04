/* @layer renderer-components @kind util */
import type { FocusEvent } from 'react';
import { isNode } from '../Portal/behavior/is-node';

const focusLeft = (event: FocusEvent<HTMLElement>): boolean => {
  const next = event.relatedTarget;
  return next === null || !isNode(next) || !event.currentTarget.contains(next);
};

export { focusLeft };
