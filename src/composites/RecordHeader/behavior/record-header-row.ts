/* @layer renderer-components @kind logic */
import type { MouseEvent } from 'react';
import { isInteractiveTarget } from '../../../primitives/dom/is-interactive-target';
import type { RecordHeaderRow } from './record-header-row.type';

const recordHeaderRow = (toggle: (() => void) | undefined): RecordHeaderRow => {
  if (!toggle) return {};
  const onClick = (event: MouseEvent<HTMLElement>) => {
    if (!isInteractiveTarget(event.target, event.currentTarget)) toggle();
  };
  return { onClick, 'data-row-toggle': '' };
};

export { recordHeaderRow };
