/* @layer renderer-components @kind util */
import { CHAR_FILTERS } from './slot-format.constants';
import { withCase } from './with-case';
import type { PatternSlotSpec } from './parse-pattern.type';

const aliasOf = (char: string, slot: PatternSlotSpec): string => {
  const aliases = slot.aliases;
  const key = withCase(char, slot);
  return aliases !== undefined && Object.hasOwn(aliases, key) ? aliases[key] ?? char : char;
};

const allowedOnly = (text: string, slot: PatternSlotSpec): string => {
  const allowed = slot.allowed;
  return allowed === undefined ? text : [...text].filter((char) => allowed.has(char)).join('');
};

const kindFilter = (slot: PatternSlotSpec): RegExp => CHAR_FILTERS[slot.allowed === undefined ? slot.chars ?? 'any' : 'any'];

const cleanText = (text: string, slot: PatternSlotSpec): string => {
  const mapped = slot.aliases === undefined ? text : [...text].map((char) => aliasOf(char, slot)).join('');
  const kept = allowedOnly(withCase(mapped.replace(kindFilter(slot), ''), slot), slot);
  const limit = slot.length ?? slot.maxLength;
  return limit === undefined ? kept : [...kept].slice(0, limit).join('');
};

export { cleanText };
