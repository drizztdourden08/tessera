/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import { hintKey } from './hint-key';

const uniqueHints = (hints: readonly Hint[]): readonly Hint[] =>
  [...new Map(hints.map((hint) => [hintKey(hint), hint])).values()];

export { uniqueHints };
