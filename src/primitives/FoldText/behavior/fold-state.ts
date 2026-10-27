/* @layer renderer-components @kind logic */
import type { FoldState } from './fold-state.type';
import type { FoldOverflow } from '../FoldText.type';

const foldState = (lines: number | undefined, overflow: FoldOverflow, open: boolean, clamped: boolean): FoldState => {
  if (lines === undefined || lines <= 0) return { clamp: undefined, more: false, hint: false };
  if (overflow === 'clip') return { clamp: lines, more: false, hint: false };
  if (overflow === 'hint') return { clamp: lines, more: false, hint: clamped };
  return { clamp: open ? undefined : lines, more: open || clamped, hint: false };
};

export { foldState };
