/* @layer renderer-components @kind util */
import type { PatternChoice } from '../PatternInput.type';

const choiceText = (choice: PatternChoice): string => choice.short ?? choice.label ?? choice.value;

export { choiceText };
