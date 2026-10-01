/* @layer renderer-components @kind util */
import type { PatternChoice } from '../PatternInput.type';

const choiceLabel = (choice: PatternChoice): string => choice.label ?? choice.value;

export { choiceLabel };
