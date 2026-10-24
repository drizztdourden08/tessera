/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { ContextMenuPoint } from '../ContextMenu.type';
import { eventPoint } from './event-point';
import { isMenuKey } from './is-menu-key';
import { keyboardPoint } from './keyboard-point';
import { useLongPress } from './useLongPress';
import type { ContextMenuState, UseContextMenuParams } from './useContextMenu.type';

const useContextMenu = (params: UseContextMenuParams): ContextMenuState => {
  const { open, point, disabled, longPress, onOpen, onClose } = params;
  const [own, setOwn] = useState<ContextMenuPoint | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const controlled = open !== undefined;
  const given = open === true && point !== undefined ? point : null;

  const begin = (at: ContextMenuPoint, from: EventTarget | null): void => {
    opener.current = from instanceof HTMLElement ? from : null;
    if (!controlled) setOwn(at);
    onOpen?.(at);
  };
  const close = (): void => {
    if (!controlled) setOwn(null);
    onClose?.();
    opener.current?.focus();
  };
  const press = useLongPress({ enabled: longPress && !disabled, onPress: begin });

  return {
    point: controlled ? given : own,
    close,
    target: {
      ...press,
      onContextMenu: (event) => {
        if (disabled || event.defaultPrevented || !event.currentTarget.contains(event.target as Node)) return;
        event.preventDefault();
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        begin(eventPoint({ x: event.clientX, y: event.clientY }, rect), event.target);
      },
      onKeyDown: (event) => {
        if (disabled || event.defaultPrevented || !isMenuKey(event) || !event.currentTarget.contains(event.target as Node)) return;
        event.preventDefault();
        begin(keyboardPoint((event.target as HTMLElement).getBoundingClientRect()), event.target);
      },
    },
  };
};

export { useContextMenu };
