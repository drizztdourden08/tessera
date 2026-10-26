/* @layer renderer-components @kind logic */
import { lineBounds } from './line-bounds';

const currentLine = (text: string, caret: number): { from: number; to: number; line: string } => {
  const [from, to] = lineBounds(text, caret, caret);
  return { from, to, line: text.slice(from, to) };
};

export { currentLine };
