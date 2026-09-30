/* @layer renderer-components @kind types */
import type { LeafNode, Rect, SplitNode } from '../DockLayout.type';

interface LeafRect {
  node: LeafNode;
  rect: Rect;
}

interface DividerRect {
  node: SplitNode;
  index: number;
  rect: Rect;
  along: number;
}

interface LaidOut {
  leaves: LeafRect[];
  dividers: DividerRect[];
}

export type { DividerRect, LaidOut, LeafRect };
