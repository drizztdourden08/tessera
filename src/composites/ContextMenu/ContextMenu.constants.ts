/* @layer renderer-components @kind data */
import type { ContextMenuPlacement, ContextMenuViewport } from './ContextMenu.type';

const MENU_ROOM: ContextMenuViewport = { width: 240, height: 320 };

const OPEN_PLACEMENT: ContextMenuPlacement = { side: 'below', align: 'start' };

const LONG_PRESS_DELAY = 500;

const LONG_PRESS_SLOP = 10;

export { LONG_PRESS_DELAY, LONG_PRESS_SLOP, MENU_ROOM, OPEN_PLACEMENT };
