/* @layer renderer-components @kind util */
import { GROUP_CLOSERS, GROUP_OPENERS } from './value-rule.constants';

const splitTopLevel = (text: string, separator: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  [...text].forEach((char, index) => {
    if (GROUP_OPENERS.has(char)) depth += 1;
    else if (GROUP_CLOSERS.has(char)) depth = Math.max(0, depth - 1);
    else if (char === separator && depth === 0) {
      parts.push(text.slice(start, index));
      start = index + 1;
    }
  });
  parts.push(text.slice(start));
  return parts;
};

export { splitTopLevel };
