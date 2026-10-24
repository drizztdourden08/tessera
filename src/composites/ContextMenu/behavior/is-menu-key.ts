/* @layer renderer-components @kind logic */
const isMenuKey = (event: { key: string; shiftKey: boolean; altKey?: boolean; ctrlKey?: boolean }): boolean =>
  event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey && event.altKey !== true && event.ctrlKey !== true);

export { isMenuKey };
