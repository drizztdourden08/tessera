/* @layer renderer-components @kind types */
import type { DragEvent } from 'react';
import type { ReorderDrop } from '../../reorder';
import type { RowState } from '../DataTable.type';

interface RowAttrs {
  'data-marquee-key': string;
  'data-reorder-index'?: number;
  'data-reorder-key'?: string;
  'data-drop'?: ReorderDrop;
  'data-dragging'?: 'yes';
  'data-state'?: RowState;
  draggable?: true;
  onDragStart?: (event: DragEvent<HTMLElement>) => void;
}

export type { RowAttrs };
