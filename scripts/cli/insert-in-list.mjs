/* @layer tooling-scripts @kind logic */
import { closingBracket } from './closing-bracket.mjs';

const insertInList = (text, open, item) => {
  const close = closingBracket(text, open);
  if (close === -1) return undefined;
  const body = text.slice(open + 1, close);
  const content = body.trimEnd();
  const gap = body.slice(content.length);
  const head = `${text.slice(0, open + 1)}${content}${content === '' || content.endsWith(',') ? '' : ','}`;
  if (gap.includes('\n')) return `${head}\n${gap.slice(gap.lastIndexOf('\n') + 1)}  ${item},${gap}${text.slice(close)}`;
  return `${head}${content === '' ? '' : ' '}${item}${gap}${text.slice(close)}`;
};

export { insertInList };
