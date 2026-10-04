/* @layer renderer-components @kind logic */
import { ESCAPES, NUMBER, NUMBER_TAIL, SPACE, WORDS } from '../JsonInput.constants';
import type { JsonCursor, JsonFault, JsonReason } from '../JsonInput.type';

const fail = (c: JsonCursor, at: number, reason: JsonReason): false => {
  c.fault = { at, reason };
  return false;
};

const skip = (c: JsonCursor): void => {
  while (SPACE.has(c.text.charAt(c.at))) c.at += 1;
};

const escape = (c: JsonCursor): boolean => {
  const next = c.text.charAt(c.at + 1);
  if (next === 'u' && /^[0-9a-fA-F]{4}$/.test(c.text.slice(c.at + 2, c.at + 6))) c.at += 6;
  else if (ESCAPES.has(next)) c.at += 2;
  else return fail(c, c.at, 'escape');
  return true;
};

const string = (c: JsonCursor): boolean => {
  const start = c.at;
  c.at += 1;
  for (;;) {
    const ch = c.text.charAt(c.at);
    if (ch === '' || ch === '\n') return fail(c, start, 'unclosed');
    if (ch === '"') break;
    if (ch === '\\') {
      if (!escape(c)) return false;
      continue;
    }
    if (ch < ' ') return fail(c, c.at, 'control');
    c.at += 1;
  }
  c.at += 1;
  return true;
};

const number = (c: JsonCursor): boolean => {
  NUMBER.lastIndex = c.at;
  const found = NUMBER.exec(c.text);
  if (!found) return fail(c, c.at, 'number');
  c.at += found[0].length;
  return NUMBER_TAIL.test(c.text.charAt(c.at)) ? fail(c, c.at, 'number') : true;
};

const word = (c: JsonCursor): boolean => {
  const found = WORDS.find((entry) => c.text.startsWith(entry, c.at));
  if (!found) return fail(c, c.at, 'value');
  c.at += found.length;
  return true;
};

const members = (c: JsonCursor, close: string, next: JsonReason, member: (c: JsonCursor) => boolean): boolean => {
  c.at += 1;
  skip(c);
  if (c.text.charAt(c.at) === close) {
    c.at += 1;
    return true;
  }
  for (;;) {
    if (!member(c)) return false;
    const end = c.at;
    skip(c);
    const ch = c.text.charAt(c.at);
    if (ch === close) break;
    if (ch !== ',') return fail(c, end, next);
    const comma = c.at;
    c.at += 1;
    skip(c);
    if (c.text.charAt(c.at) === close) return fail(c, comma, 'trailingComma');
  }
  c.at += 1;
  return true;
};

const entry = (c: JsonCursor): boolean => {
  if (c.text.charAt(c.at) !== '"') return fail(c, c.at, 'key');
  if (!string(c)) return false;
  skip(c);
  if (c.text.charAt(c.at) !== ':') return fail(c, c.at, 'colon');
  c.at += 1;
  return value(c);
};

const item = (c: JsonCursor): boolean => value(c);

const value = (c: JsonCursor): boolean => {
  skip(c);
  const ch = c.text.charAt(c.at);
  if (ch === '{') return members(c, '}', 'objectNext', entry);
  if (ch === '[') return members(c, ']', 'arrayNext', item);
  if (ch === '"') return string(c);
  if (ch === '-' || (ch >= '0' && ch <= '9')) return number(c);
  return word(c);
};

const scanJson = (text: string): JsonFault | null => {
  const c: JsonCursor = { text, at: 0, fault: null };
  skip(c);
  if (c.at === text.length) return { at: 0, reason: 'empty' };
  if (!value(c)) return c.fault;
  skip(c);
  return c.at < text.length ? { at: c.at, reason: 'extra' } : null;
};

export { scanJson };
