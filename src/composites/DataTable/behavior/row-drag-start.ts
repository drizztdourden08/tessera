/* @layer renderer-components @kind logic */
import type { DragEvent } from 'react';

const rowDragStart = (event: DragEvent<HTMLElement>, data: Record<string, string>, held: boolean): void => {
  if (event.target !== event.currentTarget) return;
  if (held) {
    event.preventDefault();
    return;
  }
  event.dataTransfer.effectAllowed = 'copyMove';
  for (const [type, value] of Object.entries(data)) event.dataTransfer.setData(type, value);
};

export { rowDragStart };
