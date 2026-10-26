/* @layer renderer-components @kind util */
import type { MenuKeyEvent } from './menu-event.type';

const isMenuKey = (event: MenuKeyEvent): boolean => {
  if (event.key === 'ContextMenu') return true;
  return event.key === 'F10' && event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey;
};

export { isMenuKey };
