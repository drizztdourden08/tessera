/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import { reorderStep } from '../../reorder/reorder-step';
import { FOCUS_KEYS } from '../SwatchGrid.constants';

const focusTarget = (event: KeyboardEvent<HTMLElement>, index: number, total: number, columns: number): number | undefined => {
  const end = FOCUS_KEYS[event.key];
  if (end !== undefined && !event.altKey && !event.ctrlKey && !event.metaKey) return end === 'first' ? 0 : total - 1;
  return reorderStep(event, { axis: 'grid', chord: 'plain', index, total, columns });
};

export { focusTarget };
