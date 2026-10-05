/* @layer renderer-components @kind data */
const TABLE_STRINGS = {
  ascending: 'ascending',
  descending: 'descending',
  ordinal: (n: number): string => {
    const teen = n % 100 >= 11 && n % 100 <= 13;
    const ones = n % 10;
    if (teen) return `${n}th`;
    if (ones === 1) return `${n}st`;
    if (ones === 2) return `${n}nd`;
    if (ones === 3) return `${n}rd`;
    return `${n}th`;
  },
  sortEntry: (label: string, direction: string) => `${label} (${direction})`,
  rankedSortEntry: (label: string, rank: string, direction: string) => `${label} (${rank}, ${direction})`,
  sortedLine: (entries: readonly string[]) => `Sorted: ${entries.join(', ')}`,
  groupedLine: (labels: readonly string[]) => `Grouped by: ${labels.join(', then ')}`,
  noSortOrGroup: 'No sorting or grouping',
  entry: 'entry',
  entries: 'entries',
  noGroupValue: '-',
  referenceId: 'Reference id',
  displayAs: 'Display as...',
  addColumn: 'Add column',
  addColumnBefore: 'Add column before',
  addColumnAfter: 'Add column after',
  removeColumn: 'Remove column',
  rename: 'Rename...',
  moveLeft: 'Move left',
  moveRight: 'Move right',
  moveToFirst: 'Move to first',
  moveToLast: 'Move to last',
  groupByColumn: 'Group by this column',
  ungroupColumn: 'Ungroup this column',
  sortAscending: 'Sort ascending',
  sortDescending: 'Sort descending',
  removeColumnSort: (direction: string) => `Remove sort on this column (${direction})`,
  fitToContent: 'Fit to content',
  expandToSpace: 'Expand to available space',
  noFieldsLeft: 'No fields left to add',
  clearSorting: 'Clear all sorting',
  clearGrouping: 'Clear all grouping',
  fitAllToContent: 'Fit all to content',
  resetColumns: 'Reset columns to defaults',
  tableOptions: 'Table options',
  moreRows: (count: number) => `+${count} more`,
  dropToRemoveNamed: (label: string) => `Drop ${label} here to remove the column`,
  dropToRemove: 'Drop to remove',
  releaseToRemove: 'Release to remove',
  resizeNamed: (label: string) => `Resize ${label}`,
  columnOptionsNamed: (label: string) => `Column options for ${label}`,
  sortByNamed: (label: string) => `Sort by ${label}`,
  selectRow: 'Select row',
  selectAllShown: 'Select all shown rows',
  collapseGroup: 'Collapse group',
  expandGroup: 'Expand group',
};

export { TABLE_STRINGS };
