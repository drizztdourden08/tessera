/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

type Words = TesseraStrings['settings'];

interface RowHints {
  resting: string;
  hints: readonly Hint[];
  whole: Hint;
  rest: readonly Hint[];
  current?: Hint;
}

export type { RowHints, Words };
