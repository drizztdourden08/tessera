/* @layer renderer-components @kind util */
import { PATTERN_SPECIALS } from './scan-pattern.constants';

const escapePatternText = (text: string): string => text.replace(PATTERN_SPECIALS, '\\$&');

export { escapePatternText };
