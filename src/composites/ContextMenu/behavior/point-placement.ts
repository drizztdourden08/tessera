/* @layer renderer-components @kind logic */
import { MENU_ROOM } from '../ContextMenu.constants';
import type { ContextMenuPlacement, ContextMenuPoint, ContextMenuViewport } from '../ContextMenu.type';

const pointPlacement = (point: ContextMenuPoint, view: ContextMenuViewport, room: ContextMenuViewport = MENU_ROOM): ContextMenuPlacement => {
  const after = { width: view.width - point.x, height: view.height - point.y };
  return {
    side: after.height < room.height && point.y > after.height ? 'above' : 'below',
    align: after.width < room.width && point.x > after.width ? 'end' : 'start',
  };
};

export { pointPlacement };
