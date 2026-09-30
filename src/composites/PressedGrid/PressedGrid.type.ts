/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface PressedGridItem {
  id: string;
  label?: ReactNode;
  title?: string;
}

interface PressedGridProps {
  items: readonly PressedGridItem[];
  pressed: readonly string[];
  className?: string;
}

export type { PressedGridItem, PressedGridProps };
