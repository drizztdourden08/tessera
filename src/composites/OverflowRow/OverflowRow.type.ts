/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

interface OverflowRowNodeState {
  tight: boolean;
}

type OverflowRowNode = ReactNode | ((state: OverflowRowNodeState) => ReactNode);

interface OverflowRowItem {
  id: string;
  node: OverflowRowNode;
  priority?: number;
  pinned?: boolean;
  end?: boolean;
  menuNode?: ReactNode;
}

interface OverflowRowProps {
  items: readonly OverflowRowItem[];
  moreLabel?: string;
  className?: string;
}

interface FoldResult {
  folded: readonly string[];
  tight: boolean;
}

interface OverflowRowSplit {
  start: readonly OverflowRowItem[];
  end: readonly OverflowRowItem[];
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

export type { FoldInput, FoldParams, FoldResult, OverflowRowItem, OverflowRowMeasureProps, OverflowRowMoreProps, OverflowRowNode, OverflowRowNodeState, OverflowRowProps, OverflowRowSplit };
