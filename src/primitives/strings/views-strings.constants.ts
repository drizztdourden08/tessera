/* @layer renderer-components @kind data */
const VIEW_STRINGS = {
  group: 'Group',
  groupBy: 'Group by',
  groupedBy: (label: string) => `Group: ${label}`,
  sort: 'Sort',
  sortBy: 'Sort by',
  sortedBy: (label: string) => `Sort: ${label}`,
  none: 'None',
  ascending: 'Ascending',
  descending: 'Descending',
  switchToAscending: 'Sort ascending',
  switchToDescending: 'Sort descending',
  showControls: 'Show view controls',
  hideControls: 'Hide view controls',
  controls: 'View',
  activeCount: (count: number) => `${count} active ${count === 1 ? 'setting' : 'settings'}`,
};

export { VIEW_STRINGS };
