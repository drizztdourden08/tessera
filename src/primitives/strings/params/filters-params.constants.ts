/* @layer renderer-components @kind data */
const FILTERS_PARAMS = {
  applyFilterNamed: ['label'],
  removeFilterNamed: ['label'],
  operatorNamed: ['operator'],
  withMatchCase: ['label'],
  valueRange: ['low', 'high'],
  moreValues: ['shown', 'more'],
  editValueNamed: ['label'],
  removeGroupNamed: ['label'],
  moreFilters: ['count'],
} as const;

export { FILTERS_PARAMS };
