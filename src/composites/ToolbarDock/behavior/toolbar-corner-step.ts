/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { takeToolbarCorner } from './take-toolbar-corner';
import { toolbarCornerReach } from './toolbar-corner-reach';
import { EDGE_PX } from './toolbar-corner-step.constants';
import type { ToolbarCornerSession, ToolbarCornerStep, ToolbarCornerStepInput } from './toolbar-corner.type';
import { toolbarEndRange } from './toolbar-end-range';
import type { ToolbarEndRange, ToolbarMetrics } from './toolbar-resize.type';

const direction = (range: ToolbarEndRange, start: boolean, px: number): { atEdge: boolean; outward: boolean } => ({
  atEdge: start ? range.value <= EDGE_PX : range.value >= range.span - EDGE_PX,
  outward: start ? px < range.value : px > range.value,
});

const heldOf = (session: ToolbarCornerSession | null, layout: ToolbarLayout, metrics: ToolbarMetrics) =>
  (session ? { count: session.count, origin: session.origin, metrics: session.metrics } : { count: 0, origin: layout, metrics });

const toolbarCornerStep = (input: ToolbarCornerStepInput): ToolbarCornerStep | null => {
  const { layout, metrics, grip, px, session } = input;
  const range = toolbarEndRange(layout, metrics, grip.id, grip.end);
  if (!range) return null;
  const { atEdge, outward } = direction(range, grip.end === 'start', px);
  const held = heldOf(session, layout, metrics);
  if (!atEdge || !(outward || held.count > 0)) return null;
  const count = held.count + (outward ? 1 : -1);
  const { origin, metrics: base } = held;
  if (count === 0) return { layout: origin, count, origin, metrics: base };
  const reach = toolbarCornerReach(origin, base, grip, count);
  const next = reach === null ? origin : takeToolbarCorner(origin, base, grip, reach);
  return next === origin ? null : { layout: next, count, origin, metrics: base };
};

export { toolbarCornerStep };
