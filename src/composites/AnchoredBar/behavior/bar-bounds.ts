/* @layer renderer-components @kind logic */
import type { AnchoredRect } from '../../../primitives/Anchored';
import type { BarBoundary } from '../AnchoredBar.type';
import { barBoundaryElement } from './bar-boundary-element';

const barBounds = (boundary: BarBoundary | undefined, node: HTMLElement, view: Window): AnchoredRect => {
  const edge = barBoundaryElement(boundary, node)?.getBoundingClientRect();
  return edge ? { left: edge.left, top: edge.top, width: edge.width, height: edge.height } : { left: 0, top: 0, width: view.innerWidth, height: view.innerHeight };
};

export { barBounds };
