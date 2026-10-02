/* @layer renderer-components @kind util */
import type { PatternChoice } from '../DynamicInput.type';

const choiceText = (choice: PatternChoice): string => choice.short ?? choice.label ?? choice.value;

export { choiceText };
