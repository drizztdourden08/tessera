/* @layer renderer-components @kind logic */
import type { TextRange } from './match-part.type';

const rangesOf = (folded: string, word: string): TextRange[] => {
  const ranges: TextRange[] = [];
  for (let at = folded.indexOf(word); at !== -1; at = folded.indexOf(word, at + 1)) ranges.push([at, at + word.length]);
  return ranges;
};

const wordRanges = (folded: string, words: readonly string[]): TextRange[] => {
  const sorted = words.flatMap((word) => rangesOf(folded, word)).sort((a, b) => a[0] - b[0]);
  const merged: TextRange[] = [];
  for (const range of sorted) {
    const last = merged.at(-1);
    if (last !== undefined && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  return merged;
};

export { wordRanges };
