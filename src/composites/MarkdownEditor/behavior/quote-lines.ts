/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { lineBounds } from './line-bounds';
import { linesEdit } from './lines-edit';
import { QUOTE_MARK, QUOTE_MARKER } from './quote-lines.constants';

const quoteLines = (text: string, start: number, end: number): TextEdit => {
  const [from, to] = lineBounds(text, start, end);
  const lines = text.slice(from, to).split('\n');
  const filled = lines.filter((line) => line.trim() !== '');
  const quoted = filled.length > 0 && filled.every((line) => QUOTE_MARKER.test(line));
  const changed = lines.map((line) => {
    if (line.trim() === '' && lines.length > 1) return line;
    return quoted ? line.replace(QUOTE_MARKER, '') : `${QUOTE_MARK}${line}`;
  });
  return linesEdit({ from, to, start, end, lines, changed });
};

export { quoteLines };
