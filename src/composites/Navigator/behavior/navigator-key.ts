/* @layer renderer-components @kind logic */
import { keyMove } from './key-move';
import { moveViewport } from './move-viewport';
import type { KeyboardEvent } from 'react';
import type { NavigatorKeyInput } from './navigator-key.type';

const navigatorKey = (input: NavigatorKeyInput) => (event: KeyboardEvent<HTMLElement>): void => {
  const { shown, surface, unit, onKey, onViewportChange } = input;
  if (onKey?.(event)) {
    event.preventDefault();
    return;
  }
  const move = keyMove(event.key, event.shiftKey, shown, unit);
  if (move === null) return;
  event.preventDefault();
  onViewportChange(moveViewport(shown, surface, move.dx, move.dy));
};

export { navigatorKey };
