/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { isMarked } from './is-marked';
import { runLength } from './run-length';
import { trimSelection } from './trim-selection';

const wrapSelection = (text: string, start: number, end: number, mark: string): TextEdit => {
  const [from, to] = trimSelection(text, start, end);
  const size = mark.length;
  const char = mark.charAt(0);
  const inner = text.slice(from, to);
  const insideStart = runLength(inner, char, 'start');
  const insideEnd = runLength(inner, char, 'end');
  if (inner.length >= 2 * size && isMarked(insideStart, mark) && isMarked(insideEnd, mark)) {
    return { from, to, insert: inner.slice(size, inner.length - size), selectStart: from, selectEnd: to - 2 * size };
  }
  const before = runLength(text.slice(0, from), char, 'end');
  const after = runLength(text.slice(to), char, 'start');
  if (isMarked(before, mark) && isMarked(after, mark)) {
    return { from: from - size, to: to + size, insert: inner, selectStart: from - size, selectEnd: to - size };
  }
  return { from, to, insert: `${mark}${inner}${mark}`, selectStart: from + size, selectEnd: to + size };
};

export { wrapSelection };
