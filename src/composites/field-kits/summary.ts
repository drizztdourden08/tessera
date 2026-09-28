/* @layer renderer-components @kind logic */
import { isNullish } from './coerce';
import { scalarText } from './scalarText';
import { summarizeList } from './summarizeList';
import { ENTRY_COUNT, ENTRY_MAX } from './summary.constants';
import { toText } from './toText';
import { truncate } from './truncate';

const summarizeEntries = (value: unknown, limit: number = ENTRY_COUNT): string => {
  if (isNullish(value) || typeof value !== 'object') return toText(value);
  if (Array.isArray(value)) return summarizeList(value);
  const entries = Object.entries(value as Record<string, unknown>);
  if (!entries.length) return '{}';
  const head = entries
    .slice(0, limit)
    .map(([key, entry]) => `${key}: ${truncate(scalarText(entry), ENTRY_MAX)}`)
    .join(', ');
  return entries.length > limit ? `${head}, ...` : head;
};

export { summarizeEntries };
