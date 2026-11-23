/* @layer renderer-components @kind logic */
const signalStripClass = (wrap: boolean, scroll: boolean, className: string | undefined): string =>
  ['signal-strip', wrap && 'signal-strip--wrap', scroll && 'signal-strip--scroll', className].filter(Boolean).join(' ');

export { signalStripClass };
