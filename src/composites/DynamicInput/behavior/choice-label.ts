/* @layer renderer-components @kind util */
import type { PatternChoice } from '../DynamicInput.type';

const choiceLabel = (choice: PatternChoice): string => choice.label ?? choice.value;

export { choiceLabel };
