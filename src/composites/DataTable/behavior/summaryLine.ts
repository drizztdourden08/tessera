/* @layer renderer-components @kind logic */
import type { SortGroupSummary } from './sort-group-summary.type';

const summaryLine = (summary: SortGroupSummary): string => {
  const parts = [summary.sorted, summary.grouped].filter((line): line is string => Boolean(line));
  return parts.length > 0 ? parts.join('   ·   ') : 'No sorting or grouping';
};

export { summaryLine };
