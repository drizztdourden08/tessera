/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';

const hintKey = (hint: Hint): string => `${hint.label} ${hint.description}`;

export { hintKey };
