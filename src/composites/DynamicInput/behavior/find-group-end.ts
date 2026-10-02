/* @layer renderer-components @kind util */
import { ESCAPE, QUOTE } from './scan-pattern.constants';
import type { GroupEnd } from './scan-pattern.type';

const findGroupEnd = (pattern: string, open: number, closer: string): GroupEnd | null => {
  let quoted = false;
  for (let at = open + 1; at < pattern.length; at += 1) {
    const char = pattern[at];
    if (char === ESCAPE) at += 1;
    else if (char === QUOTE) quoted = !quoted;
    else if (char === closer && !quoted) return { close: at, body: pattern.slice(open + 1, at) };
  }
  return null;
};

export { findGroupEnd };
