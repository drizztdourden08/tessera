/* @layer renderer-components @kind logic */
import { DIR_WORD } from './sort-group-summary.constants';
import type { SortEntry } from '../../../data/table/types';
import type { SortGroupInput, SortGroupSummary } from './sort-group-summary.type';

const ordinal = (n: number): string => {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  const ones = n % 10;
  if (teen) return `${n}th`;
  if (ones === 1) return `${n}st`;
  if (ones === 2) return `${n}nd`;
  if (ones === 3) return `${n}rd`;
  return `${n}th`;
};

const sortedLine = (sort: readonly SortEntry[], labelOf: (path: string) => string): string | undefined => {
  if (sort.length === 0) return undefined;
  const parts = sort.map((entry, at) => {
    const rank = sort.length > 1 ? `${ordinal(at + 1)}, ` : '';
    return `${labelOf(entry.path)} (${rank}${DIR_WORD[entry.dir]})`;
  });
  return `Sorted: ${parts.join(', ')}`;
};

const groupedLine = (groupBy: readonly string[], labelOf: (path: string) => string): string | undefined => {
  if (groupBy.length === 0) return undefined;
  return `Grouped by: ${groupBy.map((path) => labelOf(path)).join(', then ')}`;
};

const summarizeSortGroup = (input: SortGroupInput): SortGroupSummary => {
  const { sort, groupBy, labelOf } = input;
  const summary: SortGroupSummary = {};
  const sorted = sortedLine(sort, labelOf);
  const grouped = groupedLine(groupBy, labelOf);

  if (sorted !== undefined) summary.sorted = sorted;
  if (grouped !== undefined) summary.grouped = grouped;
  return summary;
};

export { summarizeSortGroup };
