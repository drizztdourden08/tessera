/* @layer renderer-components @kind logic */
const layoutClass = (resizable: boolean, dragging: boolean, className?: string): string =>
  ['master-detail', resizable && 'master-detail--resizable', dragging && 'master-detail--dragging', className].filter(Boolean).join(' ');

export { layoutClass };
