/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';

interface RowHints {
  resting: string;
  hints: readonly Hint[];
  whole: Hint;
}

export type { RowHints };
