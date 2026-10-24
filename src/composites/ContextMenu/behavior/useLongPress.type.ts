/* @layer renderer-components @kind types */
import type { MouseEvent, PointerEvent } from 'react';
import type { ContextMenuPoint } from '../ContextMenu.type';

interface UseLongPressParams {
  enabled: boolean;
  onPress: (point: ContextMenuPoint, target: EventTarget) => void;
}

interface LongPressHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
  onClickCapture: (event: MouseEvent<HTMLElement>) => void;
}

export type { LongPressHandlers, UseLongPressParams };
