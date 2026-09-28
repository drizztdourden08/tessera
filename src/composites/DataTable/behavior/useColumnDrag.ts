/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { DRAG_MIME } from './useColumnDrag.constants';
import type { DragEvent } from 'react';
import type { ColumnDragBinding, ColumnDragStart } from '../DataTable.type';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const grabPoint = (ghost: HTMLElement): { x: number; y: number } => {
  const head = ghost.firstElementChild;
  const centred = ghost.offsetHeight / 2;
  const y = isHTMLElement(head) ? head.offsetTop + head.offsetHeight / 2 : centred;
  return { x: ghost.offsetWidth / 2, y };
};

const accept = (event: DragEvent<HTMLElement>): void => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const useColumnDrag = (onReorder: (path: string, to: number) => void): ColumnDragBinding => {
  const [draggingPath, setDraggingPath] = useState<string | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const onDragStart = useCallback((start: ColumnDragStart) => {
    const { path, index, event, ghost } = start;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(DRAG_MIME, path);
    if (ghost) {
      const { x, y } = grabPoint(ghost);
      event.dataTransfer.setDragImage(ghost, x, y);
    }
    setDraggingPath(path);
    setDraggingIndex(index);
    setOverIndex(index);
  }, []);

  const onDragOver = useCallback((index: number, event: DragEvent<HTMLElement>) => {
    accept(event);
    setOverIndex(index);
  }, []);

  const onDragEnd = useCallback(() => {
    setDraggingPath(null);
    setDraggingIndex(null);
    setOverIndex(null);
  }, []);

  const commit = useCallback((to: number, event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const path = draggingPath ?? event.dataTransfer.getData(DRAG_MIME);
    if (path && to >= 0) onReorder(path, to);
    onDragEnd();
  }, [draggingPath, onReorder, onDragEnd]);

  const onDrop = useCallback((index: number, event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    commit(index, event);
  }, [commit]);

  const onSurfaceHover = useCallback((event: DragEvent<HTMLElement>) => {
    accept(event);
  }, []);

  const onSurfaceDrop = useCallback((event: DragEvent<HTMLElement>) => {
    commit(overIndex ?? -1, event);
  }, [commit, overIndex]);

  return {
    draggingPath, draggingIndex, overIndex,
    onDragStart, onDragOver, onDrop, onDragEnd, onSurfaceHover, onSurfaceDrop,
  };
};

export { useColumnDrag };
