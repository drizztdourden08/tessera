/* @layer renderer-components @kind logic */
import { matchesText } from '../text/matches-text';
import { queryWords } from '../text/query-words';
import { MAX_TEXT_DEPTH } from './text-search.constants';

const textsOf = (value: unknown, depth: number): string[] => {
  if (value == null) return [];
  if (typeof value === 'string') return [value];
  if (typeof value === 'number' || typeof value === 'boolean') return [String(value)];
  if (depth <= 0 || typeof value !== 'object') return [];
  return (Array.isArray(value) ? value : Object.values(value)).flatMap((item) => textsOf(item, depth - 1));
};

const compileTextSearch = (query: string): ((row: unknown) => boolean) | null => {
  if (queryWords(query).length === 0) return null;
  return (row) => matchesText(textsOf(row, MAX_TEXT_DEPTH).join(' '), query);
};

export { compileTextSearch };
