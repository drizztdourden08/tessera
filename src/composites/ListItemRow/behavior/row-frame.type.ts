/* @layer renderer-components @kind types */
import type { CSSProperties } from 'react';
import type { ListItemRowRole } from '../ListItemRow.type';

interface RowFrame {
  className: string;
  role: ListItemRowRole | undefined;
  style: CSSProperties | undefined;
}

interface RowClassParts {
  selected: boolean;
  interactive: boolean;
  inList: boolean;
  inline: boolean;
  shown: boolean;
  className: string;
}

export type { RowClassParts, RowFrame };
