/* @layer renderer-components @kind util */
import { STRIPPED_RANGES } from './strip-unsafe-chars.constants';

const isStripped = (code: number): boolean => STRIPPED_RANGES.some(([from, to]) => code >= from && code <= to);

const stripUnsafeChars = (text: string): string => {
  let kept = '';
  for (const char of text) {
    if (!isStripped(char.codePointAt(0) ?? 0)) kept += char;
  }
  return kept;
};

export { stripUnsafeChars };
