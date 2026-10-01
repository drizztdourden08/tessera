/* @layer renderer-components @kind util */
import { ECHO_BODY } from './parse-pattern.constants';
import type { PatternPart } from './parse-pattern.type';

const readEcho = (body: string): PatternPart | null => {
  const match = ECHO_BODY.exec(body.trim());
  if (match === null) return null;
  const [, name = '', field] = match;
  return field === undefined ? { kind: 'echo', name } : { kind: 'echo', name, field };
};

export { readEcho };
