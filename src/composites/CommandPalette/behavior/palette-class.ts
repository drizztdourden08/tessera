/* @layer renderer-components @kind logic */
const paletteClass = (open: boolean, className: string): string =>
  ['command-palette', open && 'command-palette--open', className].filter(Boolean).join(' ');

export { paletteClass };
