/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { LANE_FALLBACK, MAX_LANES, TOOLBAR_OPPOSITE, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarSide } from '../ToolbarDock.type';
import { measureLaneSpans } from './measure-lane-spans';
import { toolbarOrientation } from './toolbar-orientation';
import type { ToolbarFrame } from './toolbar-drag.type';

const laneThickness = (root: HTMLElement, side: ToolbarSide): number | null => {
  const lane = root.querySelector(`:scope > [data-side="${side}"][data-lane]`);
  if (!isHTMLElement(lane)) return null;
  const box = lane.getBoundingClientRect();
  return toolbarOrientation(side) === 'horizontal' ? box.height : box.width;
};

const thicknessOfBox = (side: ToolbarSide, box: DOMRect): number => (toolbarOrientation(side) === 'horizontal' ? box.height : box.width);

const laneThicknesses = (root: HTMLElement): Record<ToolbarSide, number[]> => {
  const out = { top: [], bottom: [], left: [], right: [] } as Record<ToolbarSide, number[]>;
  for (const side of TOOLBAR_SIDES) {
    for (let lane = 0; lane < MAX_LANES; lane += 1) {
      const element = root.querySelector(`:scope > [data-side="${side}"][data-lane="${lane}"]`);
      out[side].push(isHTMLElement(element) ? thicknessOfBox(side, element.getBoundingClientRect()) : 0);
    }
  }
  return out;
};

const measureToolbarFrame = (root: HTMLElement): ToolbarFrame => {
  const box = root.getBoundingClientRect();
  const thicknessOf = (side: ToolbarSide): number => laneThickness(root, side) ?? laneThickness(root, TOOLBAR_OPPOSITE[side]) ?? LANE_FALLBACK;
  return {
    rect: { x: 0, y: 0, width: box.width, height: box.height },
    thickness: { top: thicknessOf('top'), bottom: thicknessOf('bottom'), left: thicknessOf('left'), right: thicknessOf('right') },
    spans: measureLaneSpans(root),
    laneThickness: laneThicknesses(root),
  };
};

export { measureToolbarFrame };
