/* @layer renderer-components @kind logic */
import { TOOLBAR_CORNER_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';
import { rebuildCornerSide } from './rebuild-corner-side';
import { toolbarCornerOrder } from './toolbar-corner-order';
import type { ToolbarCornerScene } from './toolbar-corner.type';
import type { ToolbarMetrics } from './toolbar-resize.type';

const applyToolbarTake = (scene: ToolbarCornerScene, metrics: ToolbarMetrics, count: number, px: number): ToolbarLayout | null => {
  const { layout, corner, axis, lane, candidates } = scene;
  const victim = candidates[count - 1];
  if (!victim) return null;
  const from = layout.corners[corner];
  const to = toolbarCornerOrder(from, axis, lane, victim.lane);
  const rebuild = { scene, metrics, from, to, px };
  const { h, v } = TOOLBAR_CORNER_SIDES[corner];
  const horizontal = rebuildCornerSide(h, rebuild);
  const vertical = rebuildCornerSide(v, rebuild);
  if (!horizontal || !vertical) return null;
  return { ...layout, sides: { ...layout.sides, [h]: horizontal, [v]: vertical }, corners: { ...layout.corners, [corner]: to } };
};

export { applyToolbarTake };
