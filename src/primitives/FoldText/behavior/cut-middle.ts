/* @layer renderer-components @kind logic */
import { ELLIPSIS } from '../FoldText.constants';

const cutMiddle = (text: string, kept: number): string => {
  const chars = Array.from(text);
  if (kept >= chars.length) return text;
  const keep = Math.max(kept, 0);
  const tail = Math.ceil(keep / 2);
  return chars.slice(0, keep - tail).join('') + ELLIPSIS + chars.slice(chars.length - tail).join('');
};

export { cutMiddle };
