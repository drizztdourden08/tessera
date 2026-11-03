/* @layer renderer-components @kind logic */
import type { AnchoredRect } from '../../../primitives/Anchored';
import type { BarPositionInput } from './bar-position.type';

const barSide = (input: BarPositionInput, anchor: AnchoredRect): 'bottom-center' | 'top-center' => {
  const { bounds, size, margin, gap, placement } = input;
  if (placement !== 'auto') return placement;
  const roomBelow = bounds.top + bounds.height - margin - (anchor.top + anchor.height + gap);
  const roomAbove = anchor.top - gap - (bounds.top + margin);
  return roomBelow >= size.height || roomBelow >= roomAbove ? 'bottom-center' : 'top-center';
};

export { barSide };
