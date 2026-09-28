/* @layer renderer-components @kind logic */
import { MAX_TEXT_DEPTH } from './text-search.constants';

const matchesValue = (value: unknown, query: string, depth: number): boolean => {
  if (value == null) return false;
  if (typeof value === 'string') return value.toLowerCase().includes(query);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value).includes(query);
  if (depth <= 0) return false;
  if (Array.isArray(value)) return value.some((item) => matchesValue(item, query, depth - 1));
  if (typeof value === 'object') return Object.values(value).some((item) => matchesValue(item, query, depth - 1));
  return false;
};

const compileTextSearch = (query: string): ((row: unknown) => boolean) | null => {
  const folded = query.trim().toLowerCase();
  if (!folded) return null;
  return (row) => matchesValue(row, folded, MAX_TEXT_DEPTH);
};

export { compileTextSearch };
