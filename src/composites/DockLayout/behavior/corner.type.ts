/* @layer renderer-components @kind types */
import type { LayoutNode, Rect, SplitAxis, SplitNode, WidgetId } from '../DockLayout.type';

type CornerEnd = 'start' | 'end';

type CornerName = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CornerOptions {
  along?: SplitAxis;
  give?: boolean;
}

interface CornerSpot {
  end: CornerEnd;
  along: SplitAxis;
}

interface CornerPart {
  node: LayoutNode;
  size: number;
}

interface CornerStep {
  parent: SplitNode;
  depth: number;
  at: number;
}

interface TakeSite {
  outer: SplitNode;
  inner: SplitNode;
  at: number;
  innerAt: number;
  beside: number;
}

interface GiveSite {
  column: SplitNode;
  other: SplitNode;
  at: number;
  otherAt: number;
  beside: number;
}

interface CornerSites {
  take: TakeSite | null;
  give: GiveSite | null;
}

interface CornerHandle {
  key: string;
  active: WidgetId;
  end: CornerEnd;
  along: SplitAxis;
  rect: Rect;
  take: number | null;
  give: number | null;
  takeCorner: CornerName | null;
  giveCorner: CornerName | null;
}

type CornerTurn = 'take' | 'give';

interface CornerPull {
  outward: 1 | -1;
  take: number | null;
  give: number | null;
  handle: CornerHandle;
}

interface CornerZone {
  key: string;
  divider: number;
  axis: SplitAxis;
  rect: Rect;
  pulls: CornerPull[];
}

interface CornerSeed {
  divider: number;
  rect: Rect;
  pull: CornerPull;
}

interface CornerReach {
  size: number | null;
  corner: CornerName | null;
}

export type {
  CornerEnd, CornerHandle, CornerName, CornerOptions, CornerPart, CornerPull, CornerReach, CornerSeed, CornerSites, CornerSpot, CornerStep,
  CornerTurn, CornerZone, GiveSite, TakeSite,
};
