/* @layer renderer-components @kind logic */
import { EDGES, MAIN_NODE, createPane, toFloating, wrapBeside } from '../../DockLayout';
import type { DockEdge, LayoutNode, PaneNode } from '../../DockLayout';
import type { WidgetFrame, WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './create-default-layout';
import { dockedShare } from './docked-share';
import type { FlatWidgetLayout, FlatWidgetState } from './widget-layout.type';

const isRecord = (raw: unknown): raw is Record<string, unknown> => typeof raw === 'object' && raw !== null;

const isFlat = (raw: unknown): raw is FlatWidgetLayout =>
  isRecord(raw) && Array.isArray(raw.widgets) && raw.widgets.every((w) => isRecord(w) && typeof w.id === 'string');

const countMain = (node: unknown): number => {
  if (!isRecord(node)) return 0;
  if (node.kind === 'main') return 1;
  return Array.isArray(node.children) ? node.children.reduce<number>((n, c) => n + countMain(c), 0) : 0;
};

const isCurrent = (raw: unknown): raw is WidgetLayout =>
  isRecord(raw) && raw.v === 2 && isRecord(raw.dock) && Array.isArray(raw.floating) && Array.isArray(raw.popped)
  && isRecord(raw.frame) && countMain(raw.dock) === 1;

const windowRect = () => ({
  x: 0,
  y: 0,
  width: typeof window === 'undefined' ? 0 : window.innerWidth,
  height: typeof window === 'undefined' ? 0 : window.innerHeight,
});

const stackOf = (panes: PaneNode[], side: DockEdge): LayoutNode => {
  if (panes.length === 1 && panes[0]) return panes[0];
  const axis = side === 'left' || side === 'right' ? 'column' : 'row';
  return { kind: 'split', axis, children: panes, sizes: panes.map(() => 1 / panes.length) };
};

const dockSide = (dock: LayoutNode, visible: FlatWidgetState[], side: DockEdge): LayoutNode => {
  const docked = visible.filter((w) => w.mode === 'docked' && w.side === side).sort((a, b) => a.order - b.order);
  if (docked.length === 0) return dock;
  const panes = docked.map((w) => createPane([w.id], w.exclusive));
  const widest = Math.max(...docked.map((w) => w.dockedSize));
  return wrapBeside(dock, side, stackOf(panes, side), dockedShare(side, widest));
};

const fromFlat = (flat: FlatWidgetLayout): WidgetLayout => {
  const visible = flat.widgets.filter((w) => w.visible);
  const dock = EDGES.reduce<LayoutNode>((tree, side) => dockSide(tree, visible, side), MAIN_NODE);
  const main = windowRect();
  const floating = visible
    .filter((w) => w.mode === 'floating')
    .map((w) => toFloating(w.id, { x: w.x, y: w.y, width: w.width, height: w.height }, main));
  const frame: Partial<Record<string, WidgetFrame>> = {};
  for (const w of flat.widgets) frame[w.id] = { opacity: w.opacity, show: w.visibility };
  return { v: 2, dock, floating, popped: [], frame };
};

const migrateLayout = (raw: unknown): WidgetLayout => {
  if (isCurrent(raw)) return raw;
  if (isFlat(raw)) return fromFlat(raw);
  return createDefaultLayout();
};

export { migrateLayout };
