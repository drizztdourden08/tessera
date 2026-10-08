/* @layer renderer-components @kind component */
import { useCallback } from 'react';
import type { DragEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from '../behavior/column-width-math.constants';
import type { ColumnResizeHandleProps } from './ColumnResizeHandle.type';
import './ColumnResizeHandle.css';

const ColumnResizeHandle = (props: ColumnResizeHandleProps) => {
  const { label, path, index, width, cellRef, headerId, actions, onResizingChange, onDragOver, onDrop } = props;
  const { table } = useTesseraStrings();
  const measure = useCallback(() => Math.round(cellRef.current?.getBoundingClientRect().width ?? MIN_COLUMN_WIDTH), [cellRef]);

  return (
    <ResizeHandle
      look="line"
      className="data-table__resize"
      label={table.resizeNamed(label)}
      value={width}
      min={MIN_COLUMN_WIDTH}
      max={MAX_COLUMN_WIDTH}
      measure={measure}
      controls={headerId}
      onResize={(next) => actions.onPreviewResize(path, Math.round(next))}
      onResizeEnd={(next) => actions.onResize(path, Math.round(next))}
      onDragChange={onResizingChange}
      onDragOver={onDragOver && ((event: DragEvent<HTMLElement>) => onDragOver(index, event))}
      onDrop={onDrop && ((event: DragEvent<HTMLElement>) => onDrop(index, event))}
    />
  );
};

export { ColumnResizeHandle };
