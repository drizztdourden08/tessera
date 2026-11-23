/* @layer renderer-components @kind logic */
import type { MouseEvent } from 'react';
import { isInteractiveTarget } from '../../../primitives/dom/is-interactive-target';

type RecordHeaderRow = { onClick?: (event: MouseEvent<HTMLElement>) => void; 'data-row-toggle'?: string };

const recordHeaderRow = (toggle: (() => void) | undefined): RecordHeaderRow => {
  if (!toggle) return {};
  const onClick = (event: MouseEvent<HTMLElement>) => {
    if (!isInteractiveTarget(event.target, event.currentTarget)) toggle();
  };
  return { onClick, 'data-row-toggle': '' };
};

export { recordHeaderRow };
