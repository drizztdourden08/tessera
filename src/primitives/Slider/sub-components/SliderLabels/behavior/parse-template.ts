/* @layer renderer-components @kind util */
import type { LabelTemplate, TemplatePart } from './label-rule.type';
import { parsePlaceholder } from './parse-placeholder';

const parseWords = (text: string): LabelTemplate => {
  if (!text.endsWith(']')) throw new Error('A word list opens with [ and closes with ], like [Low, Medium, High].');
  const words = text.slice(1, -1).split(',').map((word) => word.trim());
  if (words.some((word) => word === '')) throw new Error(`The word list ${text} has an empty word.`);
  return { kind: 'words', words };
};

const nextPart = (rest: string): { part: TemplatePart; length: number } => {
  const open = rest.indexOf('{');
  const close = rest.indexOf('}');
  if (close !== -1 && (open === -1 || close < open)) throw new Error('A } has no { before it.');
  if (open > 0) return { part: { kind: 'text', text: rest.slice(0, open) }, length: open };
  if (open === -1) return { part: { kind: 'text', text: rest }, length: rest.length };
  return { part: parsePlaceholder(rest.slice(1, close)), length: close + 1 };
};

const parseParts = (text: string): TemplatePart[] => {
  const parts: TemplatePart[] = [];
  let rest = text;
  while (rest.length > 0) {
    if (rest.startsWith('{') && !rest.includes('}')) throw new Error('A { has no } after it.');
    const { part, length } = nextPart(rest);
    parts.push(part);
    rest = rest.slice(length);
  }
  return parts;
};

const parseTemplate = (text: string): LabelTemplate => {
  const trimmed = text.trim();
  return trimmed.startsWith('[') ? parseWords(trimmed) : { kind: 'parts', parts: parseParts(trimmed) };
};

export { parseTemplate };
