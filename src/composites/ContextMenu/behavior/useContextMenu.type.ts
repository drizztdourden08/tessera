/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent } from 'react';
import type { ContextMenuPoint } from '../ContextMenu.type';
import type { LongPressHandlers } from './useLongPress.type';

interface UseContextMenuParams {
  open?: boolean;
  point?: ContextMenuPoint;
  disabled: boolean;
  longPress: boolean;
  onOpen?: (point: ContextMenuPoint) => void;
  onClose?: () => void;
}

interface ContextMenuTarget extends LongPressHandlers {
  onContextMenu: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

interface ContextMenuState {
  point: ContextMenuPoint | null;
  target: ContextMenuTarget;
  close: () => void;
}

export type { ContextMenuState, UseContextMenuParams };
