/* @layer renderer-components @kind logic */
import { foldChar } from './fold-char';
import { PLAIN_TEXT } from './text.constants';

const foldText = (text: string): string =>
  (PLAIN_TEXT.test(text) ? text.toLowerCase() : Array.from(text, foldChar).join('')).trim();

export { foldText };
