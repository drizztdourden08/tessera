/* @layer renderer-components @kind logic */
import { FLOAT_BOX } from '../DockLayout.constants';
import type { FloatingWidget, Rect, Size } from '../DockLayout.type';
import type { DragContext, DragSource, Point } from './drag.type';
import { floatingRect } from './floating-rect';

const paneKeyOf = (handle: HTMLElement): string | null => {
  const key = handle.closest<HTMLElement>('[data-pane-key]')?.dataset.paneKey ?? '';
  return key === '' ? null : key;
};

const grabOn = (handle: HTMLElement, stageOrigin: Point, point: Point, size: Size): Point => {
  const box = handle.getBoundingClientRect();
  const dx = point.x - (box.left - stageOrigin.x);
  const dy = point.y - (box.top - stageOrigin.y);
  return { x: Math.max(0, Math.min(dx, size.width)), y: Math.max(0, Math.min(dy, size.height)) };
};

const grabIn = (rect: Rect, point: Point): Point => ({ x: point.x - rect.x, y: point.y - rect.y });

const mainSource = (point: Point): DragSource => ({
  id: null, isMain: true, fromKey: 'main', fromTab: false, floating: null, loneWidget: false,
  start: point, grab: { x: 0, y: 0 }, size: FLOAT_BOX,
});

const isLoneIn = (ctx: DragContext, fromKey: string | null): boolean => {
  const node = fromKey ? ctx.laid?.leaves.find((l) => l.node.key === fromKey)?.node : undefined;
  return node?.kind === 'pane' && node.widgets.length === 1;
};

const floatingOf = (ctx: DragContext, id: string, fromKey: string | null): FloatingWidget | null =>
  (fromKey === null ? ctx.layout.floating.find((f) => f.id === id) ?? null : null);

const sourceFrom = (handle: HTMLElement, ctx: DragContext, stageOrigin: Point, point: Point): DragSource | null => {
  if (handle.dataset.dragMain !== undefined) return mainSource(point);
  const fromTab = handle.dataset.dragTab !== undefined;
  const id = fromTab ? handle.dataset.dragTab : handle.dataset.dragWidget;
  if (!id) return null;
  const fromKey = paneKeyOf(handle);
  const floating = floatingOf(ctx, id, fromKey);
  const size = floating ? { width: floating.width, height: floating.height } : FLOAT_BOX;
  const grab = floating && ctx.mainRect
    ? grabIn(floatingRect(floating, ctx.mainRect), point)
    : grabOn(handle, stageOrigin, point, size);
  return { id, isMain: false, fromKey, fromTab, floating, loneWidget: isLoneIn(ctx, fromKey), start: point, grab, size };
};

export { sourceFrom };
