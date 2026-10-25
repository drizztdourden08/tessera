/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { MAX_LANES, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarSide } from '../ToolbarDock.type';
import { toolbarOrientation } from './toolbar-orientation';

const padding = (style: CSSStyleDeclaration, first: string, second: string): number =>
  (Number.parseFloat(style.getPropertyValue(first)) || 0) + (Number.parseFloat(style.getPropertyValue(second)) || 0);

const laneSpan = (root: HTMLElement, side: ToolbarSide, lane: number): number => {
  const element = root.querySelector(`:scope > [data-side="${side}"][data-lane="${lane}"]`);
  if (!isHTMLElement(element)) return 0;
  const box = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  return toolbarOrientation(side) === 'horizontal'
    ? box.width - padding(style, 'padding-left', 'padding-right')
    : box.height - padding(style, 'padding-top', 'padding-bottom');
};

const measureLaneSpans = (root: HTMLElement): Record<ToolbarSide, number[]> => {
  const spans = { top: [], bottom: [], left: [], right: [] } as Record<ToolbarSide, number[]>;
  for (const side of TOOLBAR_SIDES) {
    for (let lane = 0; lane < MAX_LANES; lane += 1) spans[side].push(laneSpan(root, side, lane));
  }
  return spans;
};

export { measureLaneSpans };
