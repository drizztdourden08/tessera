/* @layer renderer-components @kind logic */
import type { ContextMenuPoint, ContextMenuRect } from '../ContextMenu.type';

const keyboardPoint = (rect: ContextMenuRect): ContextMenuPoint => ({ x: rect.left, y: rect.bottom });

export { keyboardPoint };
