/* @layer renderer-components @kind logic */
import type { DragEvent } from 'react';
import { GHOST_LIMIT } from '../Tree.constants';
import type { DragOutRequest } from './useTreeDragOut.type';

const dragOutStart = (event: DragEvent<HTMLElement>, request: DragOutRequest): void => {
  if (event.target !== event.currentTarget) return;
  const { keys, onDragOut, ghost, renderThumbnail, held } = request;
  if (held || keys.length === 0) {
    event.preventDefault();
    return;
  }
  event.dataTransfer.effectAllowed = 'copyMove';
  onDragOut(keys, event);
  const thumbnails = renderThumbnail ? keys.slice(0, GHOST_LIMIT).map(renderThumbnail) : undefined;
  ghost.onDragStart(event, { count: keys.length, thumbnails });
};

export { dragOutStart };
