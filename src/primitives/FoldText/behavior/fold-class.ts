/* @layer renderer-components @kind util */
const foldClass = (fill: boolean | undefined, className: string | undefined): string =>
  ['fold-text', fill && 'fold-text--fill', className].filter(Boolean).join(' ');

export { foldClass };
