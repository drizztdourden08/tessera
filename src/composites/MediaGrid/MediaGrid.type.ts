/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface MediaGridItem {
  src: string;
  caption: string;
  source?: string;
}

interface MediaGridProps {
  items: readonly MediaGridItem[];
  onOpen: (index: number) => void;
  columns?: number;
  empty?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

interface MediaGridCellProps {
  item: MediaGridItem;
  index: number;
  onOpen: (index: number) => void;
}

export type { MediaGridCellProps, MediaGridItem, MediaGridProps };
