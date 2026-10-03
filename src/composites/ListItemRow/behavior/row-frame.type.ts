/* @layer renderer-components @kind types */
import type { CSSProperties } from 'react';
import type { ListItemRowRole } from '../ListItemRow.type';

interface RowFrame {
  className: string;
  role: ListItemRowRole | undefined;
  style: CSSProperties | undefined;
}

export type { RowFrame };
