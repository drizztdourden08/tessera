/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const ratingLabel = (value: number | null, max: number, count: number | undefined, words: TesseraStrings['rating']): string => {
  if (value === null) return words.none;
  const base = words.outOf(value.toFixed(1), max);
  return count === undefined ? base : `${base}, ${words.from(count)}`;
};

export { ratingLabel };
