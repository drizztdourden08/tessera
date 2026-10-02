/* @layer renderer-components @kind util */
import { ESCAPE, QUOTE } from './scan-pattern.constants';
import { ARG_SPACE } from './parse-pattern.constants';

const splitArgs = (text: string): string[] => {
  const args: string[] = [];
  let current = '';
  let quoted = false;
  for (let at = 0; at < text.length; at += 1) {
    const char = text[at] ?? '';
    if (char === ESCAPE) {
      current += text[at + 1] ?? '';
      at += 1;
    } else if (char === QUOTE) {
      quoted = !quoted;
      current += char;
    } else if (ARG_SPACE.test(char) && !quoted) {
      if (current !== '') args.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  if (current !== '') args.push(current);
  return args;
};

export { splitArgs };
