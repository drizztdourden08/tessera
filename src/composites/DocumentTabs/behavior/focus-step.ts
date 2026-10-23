/* @layer renderer-components @kind util */
import { rovingIndex } from '../../../primitives/field-control/roving-index';
import { STEP_BY_KEY } from '../../../primitives/Tabs/behavior/tab-steps.constants';
import type { ReorderKeyEvent } from '../../reorder/reorder.type';

const focusStep = (event: ReorderKeyEvent, index: number, total: number): number | undefined => {
  if (event.altKey || event.ctrlKey || event.metaKey) return undefined;
  const next = rovingIndex(event.key, index, Array.from({ length: total }, () => true), STEP_BY_KEY);
  return next === null || next === index ? undefined : next;
};

export { focusStep };
