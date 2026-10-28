/* @layer renderer-components @kind util */
const paneClass = (collapsed: boolean, lined: boolean): string =>
  ['split-pane__pane', collapsed && 'split-pane__pane--folded', collapsed && lined && 'split-pane__pane--lined'].filter(Boolean).join(' ');

export { paneClass };
