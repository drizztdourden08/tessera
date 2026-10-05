/* @layer renderer-components @kind logic */
import { foldText } from './fold-text';
import { queryWords } from './query-words';

const matchesText = (text: string, query: string): boolean => {
  const words = queryWords(query);
  if (words.length === 0) return true;
  const folded = foldText(text);
  return words.every((word) => folded.includes(word));
};

export { matchesText };
