/* @layer renderer-components @kind data */
const FILTER_STRINGS = {
  addFilter: 'Add filter',
  applyFilterNamed: (label: string) => `Apply the ${label} filter`,
  removeFilterNamed: (label: string) => `Remove filter on ${label}`,
  operator: 'Filter operator',
  operatorNamed: (operator: string) => `Filter operator: ${operator}`,
  withMatchCase: (label: string) => `${label}, match case`,
  matchCase: 'Match case',
  matchCaseMark: 'Aa',
  filterBy: 'Filter by',
  pickValue: 'Choose a value',
  openBound: 'any',
  valueRange: (low: string, high: string) => `${low} to ${high}`,
  moreValues: (shown: string, more: number) => `${shown} +${more}`,
  editValueNamed: (label: string) => `Change the ${label} filter value`,
  clearFilters: 'Clear filters',
};

export { FILTER_STRINGS };
