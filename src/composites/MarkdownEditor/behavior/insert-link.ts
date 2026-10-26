/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { LINK_PLACEHOLDER, URL_PATTERN } from '../MarkdownEditor.constants';

const insertLink = (text: string, start: number, end: number): TextEdit => {
  const picked = text.slice(start, end);
  if (picked === '' || URL_PATTERN.test(picked)) {
    const insert = `[](${picked === '' ? LINK_PLACEHOLDER : picked})`;
    return { from: start, to: end, insert, selectStart: start + 1, selectEnd: start + 1 };
  }
  const urlStart = start + picked.length + 3;
  return { from: start, to: end, insert: `[${picked}](${LINK_PLACEHOLDER})`, selectStart: urlStart, selectEnd: urlStart + LINK_PLACEHOLDER.length };
};

export { insertLink };
