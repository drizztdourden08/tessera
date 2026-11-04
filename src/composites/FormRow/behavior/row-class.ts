/* @layer renderer-components @kind logic */
const rowClass = (resettable: boolean, className?: string): string =>
  ['form-row', resettable ? 'form-row--resettable' : '', className].filter(Boolean).join(' ');

export { rowClass };
