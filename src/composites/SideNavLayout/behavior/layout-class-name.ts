/* @layer renderer-components @kind logic */
const layoutClassName = (narrow: boolean, drawerOpen: boolean, className: string): string =>
  ['side-nav-layout', narrow ? 'side-nav-layout--narrow' : '', drawerOpen ? 'side-nav-layout--drawer' : '', className].filter(Boolean).join(' ');

export { layoutClassName };
