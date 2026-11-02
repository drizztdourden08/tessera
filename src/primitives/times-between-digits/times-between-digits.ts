/* @layer renderer-components @kind util */
import { BETWEEN_DIGITS, HEX_PREFIX, TIMES } from './times-between-digits.constants';

const timesBetweenDigits = (text: string): string =>
  text.replace(BETWEEN_DIGITS, (match, offset: number) => (HEX_PREFIX.test(text.slice(0, offset)) ? match : TIMES));

export { timesBetweenDigits };
