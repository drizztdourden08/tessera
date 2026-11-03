/* @layer renderer-components @kind logic */
import type { ParsedPattern, PatternPart } from './parse-pattern.type';
import type { PatternValue } from '../DynamicInput.type';

const partText = (part: PatternPart, value: PatternValue): string => {
  if (part.kind === 'literal') return part.text;
  if (part.kind !== 'slot') return '';
  return String(value[part.slot.name] ?? '');
};

const isSkipped = (part: PatternPart, value: PatternValue): boolean =>
  part.kind === 'slot' && part.slot.optional === true && partText(part, value).trim() === '';

const patternText = (parsed: ParsedPattern, value: PatternValue): string =>
  parsed.parts.reduce((text, part) => (isSkipped(part, value) ? text.trimEnd() : text + partText(part, value)), '');

export { patternText };
