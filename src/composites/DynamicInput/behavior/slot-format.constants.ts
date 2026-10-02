/* @layer renderer-components @kind data */
import type { PatternSlotChars } from './parse-pattern.type';

const FLOAT_PLACES = 6;

const NUMBER_LOCALE = 'en-US';

const MAX_DIGITS = 15;

const MINUS = '-';

const DOT = '.';

const NON_DIGITS = /\D/g;

const NON_DECIMAL = /[^\d.]/g;

const NON_HEX = /[^\da-f]/g;

const HEX_DIGITS = 6;

const SHORT_HEX_DIGITS = 3;

const HEX_PREFIX = '#';

const LINE_BREAKS = /[\r\n]/g;

const CHAR_FILTERS: Readonly<Record<PatternSlotChars, RegExp>> = {
  any: LINE_BREAKS,
  digits: NON_DIGITS,
  letters: /[^\p{L}]/gu,
  alnum: /[^\p{L}\d]/gu,
};

export {
  CHAR_FILTERS, DOT, FLOAT_PLACES, HEX_DIGITS, HEX_PREFIX, MAX_DIGITS, MINUS, NON_DECIMAL, NON_DIGITS, NON_HEX, NUMBER_LOCALE,
  SHORT_HEX_DIGITS,
};
