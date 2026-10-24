/* @layer renderer-components @kind logic */
import { rovingIndex } from '../../../primitives/field-control/roving-index';
import { ARROW_STEPS, FIELD_LEAVE_KEY } from '../Toolbar.constants';
import type { StopMode } from './next-stop.type';

const nextStop = (key: string, mode: StopMode, index: number, count: number): number | null => {
  if (mode === 'field' && key !== FIELD_LEAVE_KEY) return null;
  const steps = mode === 'field' ? { [FIELD_LEAVE_KEY]: -1 } : ARROW_STEPS[mode];
  const next = rovingIndex(key, index, Array.from({ length: count }, () => true), steps);
  return next === null || next === index ? null : next;
};

export { nextStop };
