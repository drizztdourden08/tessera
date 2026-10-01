/* @layer renderer-components @kind util */
import { asNode } from './as-node';
import { elementOf } from './element-of';
import { FOCUS_TAKERS } from './pattern-focus.constants';
import type { MouseEvent } from 'react';

const keepSegmentFocus = (event: MouseEvent): void => {
  const node = asNode(event.target);
  const element = node === null ? null : elementOf(node);
  if (element?.closest(FOCUS_TAKERS) == null) event.preventDefault();
};

export { keepSegmentFocus };
