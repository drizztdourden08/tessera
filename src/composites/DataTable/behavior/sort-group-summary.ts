/* @layer renderer-components @kind logic */
import { directionWord } from './direction-word';
import type { SortGroupInput, SortGroupSummary } from './sort-group-summary.type';

const sortedLine = (input: SortGroupInput): string | undefined => {
  const { sort, labelOf, strings } = input;
  if (sort.length === 0) return undefined;
  const parts = sort.map((entry, at) => {
    const label = labelOf(entry.path);
    const direction = directionWord(entry.dir, strings);
    return sort.length > 1
      ? strings.rankedSortEntry(label, strings.ordinal(at + 1), direction)
      : strings.sortEntry(label, direction);
  });
  return strings.sortedLine(parts);
};

const groupedLine = (input: SortGroupInput): string | undefined => {
  const { groupBy, labelOf, strings } = input;
  if (groupBy.length === 0) return undefined;
  return strings.groupedLine(groupBy.map((path) => labelOf(path)));
};

const summarizeSortGroup = (input: SortGroupInput): SortGroupSummary => {
  const summary: SortGroupSummary = {};
  const sorted = sortedLine(input);
  const grouped = groupedLine(input);

  if (sorted !== undefined) summary.sorted = sorted;
  if (grouped !== undefined) summary.grouped = grouped;
  return summary;
};

export { summarizeSortGroup };
