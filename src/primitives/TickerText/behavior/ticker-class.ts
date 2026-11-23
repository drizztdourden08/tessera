/* @layer renderer-components @kind util */
const tickerClass = (sliding: boolean, className: string | undefined): string =>
  ['ticker-text', sliding && 'ticker-text--sliding', className].filter(Boolean).join(' ');

export { tickerClass };
