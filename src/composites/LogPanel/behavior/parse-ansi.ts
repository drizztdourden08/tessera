/* @layer renderer-components @kind logic */
import { ESCAPE, PLAIN } from './ansi.constants';
import { applySgr } from './ansi-sgr';
import { sameStyle } from './same-style';
import type { AnsiSpan, AnsiStyle } from './ansi.type';

const parseAnsi = (text: string): AnsiSpan[] => {
  const spans: AnsiSpan[] = [];
  let style: AnsiStyle = PLAIN;
  let cursor = 0;
  const flush = (end: number) => {
    if (end <= cursor) return;
    const chunk = text.slice(cursor, end);
    const last = spans[spans.length - 1];
    if (last && sameStyle(last, style)) last.text += chunk;
    else spans.push({ ...style, text: chunk });
  };
  for (const found of text.matchAll(ESCAPE)) {
    flush(found.index);
    if (found[2] === 'm') style = applySgr(style, found[1] ?? '');
    cursor = found.index + found[0].length;
  }
  flush(text.length);
  return spans;
};

export { parseAnsi };
