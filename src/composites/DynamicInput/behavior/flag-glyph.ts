/* @layer renderer-components @kind util */
import { LETTER_A, REGION_CODE, REGIONAL_LETTER_A } from './choice.constants';

const flagGlyph = (code: string | undefined): string => {
  if (code === undefined || !REGION_CODE.test(code)) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map((letter) => REGIONAL_LETTER_A + letter.charCodeAt(0) - LETTER_A));
};

export { flagGlyph };
