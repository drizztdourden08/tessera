/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { MAX_LANES, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarSide } from '../ToolbarDock.type';
import { toolbarOrientation } from './toolbar-orientation';

const laneStart = (root: HTMLElement, side: ToolbarSide, lane: number): number => {
  const element = root.querySelector(`:scope > [data-side="${side}"][data-lane="${lane}"]`);
  if (!isHTMLElement(element)) return Number.NaN;
  const box = element.getBoundingClientRect();
  const origin = root.getBoundingClientRect();
  const style = getComputedStyle(element);
  return toolbarOrientation(side) === 'horizontal'
    ? box.left - origin.left + (Number.parseFloat(style.getPropertyValue('padding-left')) || 0)
    : box.top - origin.top + (Number.parseFloat(style.getPropertyValue('padding-top')) || 0);
};

const measureLaneStarts = (root: HTMLElement): Record<ToolbarSide, number[]> => {
  const starts = { top: [], bottom: [], left: [], right: [] } as Record<ToolbarSide, number[]>;
  for (const side of TOOLBAR_SIDES) {
    for (let lane = 0; lane < MAX_LANES; lane += 1) starts[side].push(laneStart(root, side, lane));
  }
  return starts;
};

export { measureLaneStarts };
