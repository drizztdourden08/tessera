/* @layer renderer-components @kind data */
const LISTS_PARAMS = {
  count: ['title', 'shown', 'total'],
  filterOf: ['title'],
  loadingOf: ['title'],
  loadFailed: ['title'],
  noMatch: ['query'],
  deleteNamed: ['name'],
  undoDeleteOf: ['name'],
  unsavedOpen: ['current', 'next'],
  unsavedLeave: ['current'],
  itemsMoved: ['count', 'position', 'total'],
  itemsMovedInto: ['count', 'section'],
} as const;

export { LISTS_PARAMS };
