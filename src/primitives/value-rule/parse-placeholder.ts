/* @layer renderer-components @kind util */
import { PLACEHOLDER } from './value-rule.constants';
import type { NumberOperator, TemplatePart } from './value-rule.type';
import { parseNumberPattern } from './parse-number-pattern';

const parseChoice = (body: string): TemplatePart => {
  const forms = body.split('|');
  if (forms.length > 3) throw new Error(`{${body}} has ${forms.length} forms. A choice has two, {one|other}, or three, {zero|one|other}.`);
  return { kind: 'choice', forms };
};

const numberPart = (body: string, match: RegExpExecArray): TemplatePart => {
  const [, source, operator, operand, pattern] = match;
  if (operator === '/' && Number(operand) === 0) throw new Error(`{${body}} divides by zero.`);
  return {
    kind: 'number',
    source: source === 'p' ? 'p' : 'v',
    operator: (operator as NumberOperator | undefined) ?? null,
    operand: Number(operand ?? 0),
    pattern: pattern === undefined ? null : parseNumberPattern(pattern),
  };
};

const parsePlaceholder = (body: string): TemplatePart => {
  if (body.includes('|')) return parseChoice(body);
  const text = body.trim();
  if (text === 'stop') return { kind: 'stop' };
  const match = PLACEHOLDER.exec(text);
  if (!match) throw new Error(`{${body}} is not a placeholder. Use {v}, {p}, {stop}, {v:0.0}, {v*100} or a choice like {heart|hearts}.`);
  return numberPart(body, match);
};

export { parsePlaceholder };
