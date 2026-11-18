/* @layer renderer-components @kind data */
const TABLE_PARAMS = {
  ordinal: ['n'],
  sortEntry: ['label', 'direction'],
  rankedSortEntry: ['label', 'rank', 'direction'],
  sortedLine: ['entries'],
  groupedLine: ['labels'],
  removeColumnSort: ['direction'],
  moreRows: ['count'],
  dropToRemoveNamed: ['label'],
  resizeNamed: ['label'],
  columnOptionsNamed: ['label'],
  sortByNamed: ['label'],
  rowMoved: ['position', 'total'],
} as const;

export { TABLE_PARAMS };
