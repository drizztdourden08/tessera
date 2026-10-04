/* @layer renderer-components @kind data */
const TABBABLE = [
  'a[href]', 'area[href]', 'button:not(:disabled)', 'input:not(:disabled):not([type="hidden"])', 'select:not(:disabled)',
  'textarea:not(:disabled)', 'iframe', 'summary', '[contenteditable]:not([contenteditable="false"])', '[tabindex]',
].join(', ');

export { TABBABLE };
