/* @layer renderer-components @kind data */
const CELL_CONTROL_SELECTOR = [
  'button',
  'a',
  'input',
  'select',
  'textarea',
  'summary',
  '[role=button]',
  '[role=link]',
  '[role=checkbox]',
  '[role=switch]',
  '[role=menuitem]',
  '[tabindex]:not([tabindex="-1"])',
  '[data-cell-control]',
].join(', ');

export { CELL_CONTROL_SELECTOR };
