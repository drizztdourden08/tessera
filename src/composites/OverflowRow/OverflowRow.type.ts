/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

interface OverflowRowItem {
  id: string;
  node: ReactNode;
  priority?: number;
  pinned?: boolean;
  menuNode?: ReactNode;
}

interface OverflowRowProps {
  items: readonly OverflowRowItem[];
  moreLabel?: string;
  className?: string;
}

interface FoldParams {
  rowRef: RefObject<HTMLElement | null>;
  measureRef: RefObject<HTMLElement | null>;
  items: readonly OverflowRowItem[];
}

interface FoldInput {
  items: readonly OverflowRowItem[];
  widths: readonly number[];
  moreWidth: number;
  gap: number;
  room: number;
}

interface OverflowRowMeasureProps {
  measureRef: RefObject<HTMLDivElement | null>;
  items: readonly OverflowRowItem[];
  label: string;
}

interface OverflowRowMoreProps {
  folded: readonly OverflowRowItem[];
  label: string;
}

export type { FoldInput, FoldParams, OverflowRowItem, OverflowRowMeasureProps, OverflowRowMoreProps, OverflowRowProps };
