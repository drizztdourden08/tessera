/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { LANE_FALLBACK, TOOLBAR_OPPOSITE } from '../ToolbarDock.constants';
import type { ToolbarSide } from '../ToolbarDock.type';
import { toolbarOrientation } from './toolbar-orientation';
import type { ToolbarFrame } from './toolbar-drag.type';

const laneThickness = (root: HTMLElement, side: ToolbarSide): number | null => {
  const lane = root.querySelector(`:scope > [data-side="${side}"] [data-lane]`);
  if (!isHTMLElement(lane)) return null;
  const box = lane.getBoundingClientRect();
  return toolbarOrientation(side) === 'horizontal' ? box.height : box.width;
};

const measureToolbarFrame = (root: HTMLElement): ToolbarFrame => {
  const box = root.getBoundingClientRect();
  const thicknessOf = (side: ToolbarSide): number => laneThickness(root, side) ?? laneThickness(root, TOOLBAR_OPPOSITE[side]) ?? LANE_FALLBACK;
  return {
    rect: { x: 0, y: 0, width: box.width, height: box.height },
    thickness: { top: thicknessOf('top'), bottom: thicknessOf('bottom'), left: thicknessOf('left'), right: thicknessOf('right') },
  };
};

export { measureToolbarFrame };
