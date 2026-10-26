/* @layer renderer-components @kind logic */
import type { MarkdownEditorListStyle, TextEdit } from '../MarkdownEditor.type';
import { lineBounds } from './line-bounds';
import { linesEdit } from './lines-edit';
import { LIST_MARKERS } from './prefix-lines.constants';

const stripMarkers = (line: string): string => line.replace(LIST_MARKERS.bullet, '$1').replace(LIST_MARKERS.number, '$1');

const addMarker = (line: string, style: MarkdownEditorListStyle, position: number): string => {
  const plain = stripMarkers(line);
  const indent = plain.slice(0, plain.length - plain.trimStart().length);
  return `${indent}${style === 'bullet' ? '- ' : `${position}. `}${plain.slice(indent.length)}`;
};

const prefixLines = (text: string, start: number, end: number, style: MarkdownEditorListStyle): TextEdit => {
  const [from, to] = lineBounds(text, start, end);
  const lines = text.slice(from, to).split('\n');
  const filled = lines.filter((line) => line.trim() !== '');
  const marked = filled.length > 0 && filled.every((line) => LIST_MARKERS[style].test(line));
  let position = 0;
  const changed = lines.map((line) => {
    if (line.trim() === '' && lines.length > 1) return line;
    position += 1;
    return marked ? line.replace(LIST_MARKERS[style], '$1') : addMarker(line, style, position);
  });
  return linesEdit({ from, to, start, end, lines, changed });
};

export { prefixLines };
