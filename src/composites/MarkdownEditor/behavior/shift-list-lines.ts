/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { INDENT } from './list-keys.constants';
import { lineBounds } from './line-bounds';
import { linesEdit } from './lines-edit';
import { parseListLine } from './parse-list-line';

const outdented = (line: string): string => (line.startsWith('\t') ? line.slice(1) : line.replace(/^ {1,2}/, ''));

const shiftList = (line: string, outdent: boolean): string => (outdent ? outdented(line) : `${INDENT}${line}`);

const shiftListLines = (text: string, start: number, end: number, outdent: boolean): TextEdit | null => {
  const [from, to] = lineBounds(text, start, end);
  const lines = text.slice(from, to).split('\n');
  const filled = lines.filter((line) => line.trim() !== '');
  if (filled.length === 0 || !filled.every((line) => parseListLine(line))) return null;
  const changed = lines.map((line) => (line.trim() === '' ? line : shiftList(line, outdent)));
  if (outdent && changed.every((line, at) => line === lines[at])) return null;
  return linesEdit({ from, to, start, end, lines, changed });
};

export { shiftListLines };
