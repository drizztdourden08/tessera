/* @layer renderer-components @kind util */
import { PLACEMENT_KEYWORDS } from './label-rule.constants';
import type { LabelPlacement, RulePoint } from './label-rule.type';
import { parseNumber } from './parse-number';
import { splitTopLevel } from './split-top-level';

const parsePoint = (item: string): RulePoint => {
  const [head = '', ...rest] = item.split('=');
  const key = head.trim().toLowerCase();
  const text = rest.length > 0 ? rest.join('=').trim() : undefined;
  if (key === 'min' || key === 'max') return { value: key, text };
  const value = parseNumber(key);
  if (value === null) {
    throw new Error(`"${item.trim()}" is neither a placement nor a value. Place labels with every N, count N, ends, steps, none, or values like 0, 50, max=Full.`);
  }
  return { value, text };
};

const everyPlacement = (size: string): LabelPlacement => {
  const value = parseNumber(size);
  if (value === null || value <= 0) throw new Error(`every takes a number above 0, like every 0.5, not "${size}".`);
  return { kind: 'every', size: value };
};

const countPlacement = (count: string): LabelPlacement => {
  const value = parseNumber(count);
  if (value === null || !Number.isInteger(value) || value < 2) throw new Error(`count takes a whole number of 2 or more, like count 5, not "${count}".`);
  return { kind: 'count', count: value };
};

const parseClause = (clause: string): LabelPlacement => {
  const text = clause.trim().replace(/\s+/g, ' ');
  if (text === '') throw new Error('A + has nothing on one side of it.');
  const keyword = PLACEMENT_KEYWORDS.get(text.toLowerCase());
  if (keyword) return keyword;
  const every = /^every (\S+)$/i.exec(text);
  if (every) return everyPlacement(every[1] ?? '');
  const count = /^count (\S+)$/i.exec(text);
  if (count) return countPlacement(count[1] ?? '');
  return { kind: 'at', points: text.replace(/^at /i, '').split(',').map(parsePoint) };
};

const parsePlacements = (text: string): LabelPlacement[] => splitTopLevel(text, '+').map(parseClause);

export { parsePlacements };
