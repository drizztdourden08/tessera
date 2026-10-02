/* @layer renderer-components @kind data */
import type { PatternChoice } from '../DynamicInput.type';

const REGION_CODE = /^[A-Za-z]{2}$/;

const REGIONAL_LETTER_A = 0x1f1e6;

const LETTER_A = 'A'.charCodeAt(0);

const NO_CHOICES: readonly PatternChoice[] = [];

export { LETTER_A, NO_CHOICES, REGION_CODE, REGIONAL_LETTER_A };
