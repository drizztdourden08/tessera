/* @layer renderer-components @kind util */
import { MIN_DROP_WIDTH } from './listbox.constants';
import type { DropPlacement } from './drop-placement.type';

const fitDropWidth = (natural: number, placement: DropPlacement): number => {
  const { anchorWidth, radius, maxWidth } = placement;
  const wanted = Math.max(natural, anchorWidth, MIN_DROP_WIDTH);
  const capped = Math.max(Math.min(wanted, maxWidth), anchorWidth);
  const extra = capped - anchorWidth;
  return extra > 0 && extra < radius * 2 ? anchorWidth + radius * 2 : Math.ceil(capped);
};

export { fitDropWidth };
