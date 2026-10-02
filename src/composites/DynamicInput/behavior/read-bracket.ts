/* @layer renderer-components @kind util */
import { BRACKET_BODY, SPACER } from './parse-pattern.constants';
import type { PatternPart } from './parse-pattern.type';

const readBracket = (body: string): PatternPart | null => {
  const text = body.trim();
  if (text === SPACER) return { kind: 'spacer' };
  const match = BRACKET_BODY.exec(text);
  if (match === null) return null;
  const name = match[2] ?? '';
  return match[1] === 'icon' ? { kind: 'icon', name } : { kind: 'action', name };
};

export { readBracket };
