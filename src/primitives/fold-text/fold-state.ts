/* @layer renderer-components @kind logic */
import type { FoldState } from './fold-state.type';
import type { FoldOverflow } from './fold-text.type';

const foldState = (lines: number | undefined, overflow: FoldOverflow, open: boolean, clamped: boolean): FoldState => {
  const folds = lines !== undefined && lines > 0;
  const hints = folds && overflow === 'hint';
  const folded = folds && (hints || !open);
  return { clamp: folded ? lines : undefined, more: folds && !hints && (open || clamped), hint: hints && clamped };
};

export { foldState };
