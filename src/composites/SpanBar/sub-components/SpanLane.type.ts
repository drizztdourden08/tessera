/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { CellGeometry, CellSpan } from '../../cell-geometry';

interface SpanLaneProps {
  cells: CellGeometry;
  count?: number;
  onCreate?: (span: CellSpan) => void;
  readOnly?: boolean;
  label?: string;
  className?: string;
  children?: ReactNode;
}

export type { SpanLaneProps };
