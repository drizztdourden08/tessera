/* @layer renderer-components @kind logic */
import { cutMiddle } from './cut-middle';

const fitMiddle = (text: string, fits: (candidate: string) => boolean, cut: (text: string, kept: number) => string = cutMiddle): string => {
  if (fits(text)) return text;
  let low = 0;
  let high = Array.from(text).length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (fits(cut(text, mid))) low = mid;
    else high = mid - 1;
  }
  return cut(text, low);
};

export { fitMiddle };
