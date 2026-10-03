/* @layer renderer-components @kind logic */
import { anchorRanks } from './anchor-ranks';
import { customRanks } from './custom-ranks';
import { randomRanks } from './random-ranks';
import { seedOfText } from './seed-of-text';
import type { LetterRankInput } from '../Emphasis.type';

const letterRanks = (input: LetterRankInput): number[] => {
  const { letters, anchor, order, seed } = input;
  if (order === 'random') return randomRanks(letters.length, seed ?? seedOfText(letters.join('')));
  if (order === 'anchor') return anchorRanks(letters.length, anchor);
  return customRanks(letters.length, order);
};

export { letterRanks };
