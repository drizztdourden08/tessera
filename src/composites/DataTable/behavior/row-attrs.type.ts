/* @layer renderer-components @kind types */
import type { DragEvent } from 'react';
import type { ReorderDrop } from '../../reorder';

interface RowAttrs {
  'data-marquee-key': string;
  'data-reorder-index'?: number;
  'data-reorder-key'?: string;
  'data-drop'?: ReorderDrop;
  'data-dragging'?: 'yes';
  draggable?: true;
  onDragStart?: (event: DragEvent<HTMLElement>) => void;
}

export type { RowAttrs };
