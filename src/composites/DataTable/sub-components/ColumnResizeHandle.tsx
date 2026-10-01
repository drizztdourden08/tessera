/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { DragEvent } from 'react';
import type { ColumnResizeHandleProps } from './ColumnResizeHandle.type';
import './ColumnResizeHandle.css';

const ColumnResizeHandle = (props: ColumnResizeHandleProps) => {
  const { label, index, resize, onDragOver, onDrop } = props;
  const { resizing, onPointerDown, onPointerMove, onPointerUp } = resize;
  const { table } = useTesseraStrings();

  return (
    <Box
      className={resizing ? 'data-table__resize data-table__resize--active' : 'data-table__resize'}
      role="separator"
      aria-orientation="vertical"
      aria-label={table.resizeNamed(label)}
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragOver={onDragOver && ((event: DragEvent<HTMLElement>) => onDragOver(index, event))}
      onDrop={onDrop && ((event: DragEvent<HTMLElement>) => onDrop(index, event))}
    />
  );
};

export { ColumnResizeHandle };
