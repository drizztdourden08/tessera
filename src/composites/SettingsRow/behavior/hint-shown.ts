/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import { hintKey } from './hint-key';

const hintShown = (hint: Hint | undefined, rest: readonly Hint[]): Hint | undefined =>
  (hint !== undefined && rest.some((line) => hintKey(line) === hintKey(hint)) ? undefined : hint);

export { hintShown };
