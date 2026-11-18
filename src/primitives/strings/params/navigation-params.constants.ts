/* @layer renderer-components @kind data */
const NAVIGATION_PARAMS = {
  collapseItemNamed: ['name'],
  expandItemNamed: ['name'],
  noResultsFor: ['query'],
  resultsFor: ['count', 'query'],
  openNamed: ['name'],
  backTo: ['page'],
  showPane: ['pane'],
  hidePane: ['pane'],
  resizePanes: ['start', 'end'],
  resizePane: ['pane'],
  pageViews: ['title'],
  pageSections: ['title'],
  siblingsOf: ['name'],
  viewing: ['across', 'down'],
  span: ['from', 'to'],
} as const;

export { NAVIGATION_PARAMS };
