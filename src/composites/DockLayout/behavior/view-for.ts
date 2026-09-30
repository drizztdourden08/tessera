/* @layer renderer-components @kind logic */
import type { DragContext, DragSource, DragSubject, DragView, HeldKeys, Point, PointerPlace } from './drag.type';
import { dropZones } from './drop-zones';
import { floatPreview } from './float-preview';
import { hitTarget } from './hit-target';
import { inRect } from './in-rect';
import { isOutside } from './is-outside';
import { wantedRect } from './wanted-rect';

const subjectOf = (source: DragSource): DragSubject =>
  ({ fromKey: source.fromKey, isMain: source.isMain, loneWidget: source.loneWidget });

const mayLeave = (ctx: DragContext, source: DragSource): boolean =>
  !source.isMain && source.id !== null && (ctx.canPopOut?.(source.id) ?? true);

const labelFor = (ctx: DragContext, source: DragSource, mode: { swap: boolean; overlay: boolean }): string => {
  const base = source.id === null ? ctx.mainLabel : ctx.labelOf(source.id);
  if (mode.swap) return `${base} · swap`;
  if (mode.overlay) return `${base} · overlay`;
  return base;
};

const paneUnder = (ctx: DragContext, pointer: Point, fromKey: string | null): string | null => {
  const leaf = ctx.laid?.leaves.find((l) => l.node.kind === 'pane' && inRect(pointer, l.rect));
  return leaf && leaf.node.key !== fromKey ? leaf.node.key : null;
};

const baseView = (ctx: DragContext, source: DragSource, place: PointerPlace, held: HeldKeys): DragView => {
  const swap = (ctx.modifiers.swap || held.shift) && !source.isMain && source.fromKey !== null;
  const overlay = ctx.modifiers.overlay || held.ctrl;
  const atEdge = !source.isMain && isOutside(place);
  const canLeave = mayLeave(ctx, source);
  return {
    pointer: place.pointer, label: labelFor(ctx, source, { swap, overlay }), zones: [], hot: null, preview: null,
    refused: false, swapKey: null, outside: atEdge && canLeave, stays: atEdge && !canLeave, canPopOut: canLeave, swap,
    overlay, floatingRect: source.floating ? wantedRect(source, place.pointer) : null,
  };
};

const viewFor = (ctx: DragContext, source: DragSource, place: PointerPlace, held: HeldKeys): DragView => {
  const view = baseView(ctx, source, place, held);
  if (!ctx.laid) return view;
  if (view.swap) return { ...view, swapKey: paneUnder(ctx, place.pointer, source.fromKey) };
  const subject = subjectOf(source);
  const zones = dropZones(ctx.laid, ctx.stage, subject);
  const hot = hitTarget(place.pointer, zones, ctx.laid, subject);
  const aimed = { ...view, zones, hot };
  if (hot && hot.kind !== 'float') return { ...aimed, preview: hot.preview };
  return { ...aimed, ...floatPreview(ctx, source, aimed) };
};

export { viewFor };
