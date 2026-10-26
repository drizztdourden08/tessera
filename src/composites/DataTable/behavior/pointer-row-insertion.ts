/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { contentPoint } from '../../marquee/content-point';
import { rowInsertion } from './row-insertion';
import type { MarqueeItem } from '../../marquee';

const pointerRowInsertion = (
  root: HTMLElement,
  rects: readonly MarqueeItem[],
  point: { clientX: number; clientY: number },
): number => {
  const { y } = contentPoint(root, cssZoomOf(root), { x: point.clientX, y: point.clientY });
  return rowInsertion(rects, y);
};

export { pointerRowInsertion };
