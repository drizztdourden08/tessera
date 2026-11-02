/* @layer renderer-components @kind logic */
import { cutMiddle } from './cut-middle';

const cutPath = (text: string, kept: number): string => {
  const split = Math.max(text.lastIndexOf('/'), text.lastIndexOf('\')) + 1;
  if (split === 0) return cutMiddle(text, kept);
  return cutMiddle(text.slice(0, split), kept) + text.slice(split);
};

export { cutPath };
