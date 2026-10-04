/* @layer renderer-components @kind data */
import type { TesseraStrings } from '../strings/tessera-strings.type';
import type { JsonReason } from './JsonInput.type';

const SPACE = new Set([' ', '\t', '\n', '\r']);

const ESCAPES = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't']);

const NUMBER = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y;

const NUMBER_TAIL = /[\w.]/;

const WORDS = ['true', 'false', 'null'] as const;

const INDENT = 2;

const LAST_LINE_KEEPER = '\u200b';

const REASON_TEXT: Readonly<Record<JsonReason, keyof TesseraStrings['options']>> = {
  empty: 'jsonEmpty',
  value: 'jsonValueMissing',
  unclosed: 'jsonUnclosed',
  escape: 'jsonEscape',
  control: 'jsonControl',
  number: 'jsonNumber',
  key: 'jsonKey',
  colon: 'jsonColon',
  objectNext: 'jsonObjectNext',
  arrayNext: 'jsonArrayNext',
  trailingComma: 'jsonTrailingComma',
  extra: 'jsonExtra',
  wantObject: 'jsonWantObject',
  wantArray: 'jsonWantArray',
};

export { ESCAPES, INDENT, LAST_LINE_KEEPER, NUMBER, NUMBER_TAIL, REASON_TEXT, SPACE, WORDS };
