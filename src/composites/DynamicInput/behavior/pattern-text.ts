/* @layer renderer-components @kind logic */
import type { ParsedPattern, PatternPart } from './parse-pattern.type';
import type { PatternValue } from '../DynamicInput.type';

const partText = (part: PatternPart, value: PatternValue): string => {
  if (part.kind === 'literal') return part.text;
  if (part.kind !== 'slot') return '';
  return String(value[part.slot.name] ?? '');
};

const patternText = (parsed: ParsedPattern, value: PatternValue): string =>
  parsed.parts.map((part) => partText(part, value)).join('');

export { patternText };
