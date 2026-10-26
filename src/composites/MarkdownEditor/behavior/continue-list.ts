/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { clearEmptyItem } from './clear-empty-item';
import { currentLine } from './current-line';
import type { ListLine } from './list-line.type';
import { parseListLine } from './parse-list-line';

const nextMarker = (marker: string): string => (/^\d+\.$/.test(marker) ? `${Number.parseInt(marker, 10) + 1}.` : marker);

const nextPrefix = (item: ListLine): string => `${item.indent}${nextMarker(item.marker)}${item.gap}${item.box === undefined ? '' : '[ ] '}`;

const continueList = (text: string, start: number, end: number): TextEdit | null => {
  if (start !== end) return null;
  const empty = clearEmptyItem(text, start, end);
  if (empty) return empty;
  const { to, line } = currentLine(text, start);
  const item = parseListLine(line);
  if (!item || start !== to) return null;
  const insert = `\n${nextPrefix(item)}`;
  return { from: start, to: start, insert, selectStart: start + insert.length, selectEnd: start + insert.length };
};

export { continueList };
