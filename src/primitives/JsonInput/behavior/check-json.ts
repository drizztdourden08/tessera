/* @layer renderer-components @kind logic */
import type { JsonCheck, JsonShape } from '../JsonInput.type';
import { scanJson } from './scan-json';

const firstMark = (text: string): number => Math.max(text.search(/\S/), 0);

const checkJson = (text: string, shape: JsonShape): JsonCheck => {
  const fault = scanJson(text);
  if (fault) return { fault };
  const value: unknown = JSON.parse(text);
  const array = Array.isArray(value);
  const object = typeof value === 'object' && value !== null && !array;
  if (shape === 'object' && !object) return { fault: { at: firstMark(text), reason: 'wantObject' } };
  if (shape === 'array' && !array) return { fault: { at: firstMark(text), reason: 'wantArray' } };
  return { value, fault: null };
};

export { checkJson };
