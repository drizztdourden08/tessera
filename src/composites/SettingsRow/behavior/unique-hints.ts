/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';

const uniqueHints = (hints: readonly Hint[]): readonly Hint[] =>
  [...new Map(hints.map((hint) => [`${hint.label} ${hint.description}`, hint])).values()];

export { uniqueHints };
