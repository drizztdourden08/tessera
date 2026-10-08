/* @layer stories @kind types */
import type { ReactNode } from 'react';

type GridSpan = 1 | 2 | 'full';

interface DenseGridProps {
  label?: string;
  children: ReactNode;
}

interface GridCellProps {
  span?: GridSpan;
  children: ReactNode;
}

export type { DenseGridProps, GridCellProps };
