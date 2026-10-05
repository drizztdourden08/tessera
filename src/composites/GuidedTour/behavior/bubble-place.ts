/* @layer renderer-components @kind logic */
import type { AnchoredPlacement } from '../../../primitives/Anchored/Anchored.type';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { BUBBLE_GAP, SIDE_ORDER, VIEW_MARGIN } from '../GuidedTour.constants';
import type { BubblePlace, TourAlign, TourBox, TourSide, TourSize } from './tour-internal.type';

const alignAt = (start: number, length: number, size: number, align: TourAlign): number => {
  if (align === 'end') return start + length - size;
  if (align === 'center') return start + (length - size) / 2;
  return start;
};

const clampAxis = (at: number, size: number, room: number): number => clampNumber(at, VIEW_MARGIN, room - size - VIEW_MARGIN);

const besideHole = ([side, align]: readonly [TourSide, TourAlign], hole: TourBox, size: TourSize, view: TourSize): TourBox => {
  if (side === 'bottom' || side === 'top') {
    const y = side === 'bottom' ? hole.y + hole.height + BUBBLE_GAP : hole.y - BUBBLE_GAP - size.height;
    return { x: clampAxis(alignAt(hole.x, hole.width, size.width, align), size.width, view.width), y, ...size };
  }
  const x = side === 'right' ? hole.x + hole.width + BUBBLE_GAP : hole.x - BUBBLE_GAP - size.width;
  return { x, y: clampAxis(alignAt(hole.y, hole.height, size.height, align), size.height, view.height), ...size };
};

const inView = (box: TourBox, view: TourSize): boolean =>
  box.x >= VIEW_MARGIN && box.y >= VIEW_MARGIN && box.x + box.width <= view.width - VIEW_MARGIN && box.y + box.height <= view.height - VIEW_MARGIN;

const insideHole = (hole: TourBox, size: TourSize, view: TourSize): TourBox => {
  const foot = Math.min(hole.y + hole.height, view.height) - BUBBLE_GAP - size.height;
  return { x: clampAxis(Math.max(hole.x, 0) + BUBBLE_GAP, size.width, view.width), y: clampAxis(foot, size.height, view.height), ...size };
};

const bubblePlace = (hole: TourBox, size: TourSize, view: TourSize, placement: AnchoredPlacement = 'bottom-start'): BubblePlace => {
  const [first, align] = placement.split('-') as [TourSide, TourAlign];
  const side = SIDE_ORDER[first].find((each) => inView(besideHole([each, align], hole, size, view), view));
  return side ? { box: besideHole([side, align], hole, size, view), side } : { box: insideHole(hole, size, view), side: 'inside' };
};

export { bubblePlace };
