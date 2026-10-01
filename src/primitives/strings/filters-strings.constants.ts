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
};

export { FILTER_STRINGS };
