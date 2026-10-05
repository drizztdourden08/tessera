/* @layer renderer-components @kind logic */
import type { FloatingPlacement } from '../../../primitives/Floating/Floating.type';
import { BUBBLE_GAP } from '../GuidedTour.constants';
import type { HoleRect } from './tour-internal.type';

const bubbleFallback = (hole: HoleRect | null): FloatingPlacement | null =>
  (hole ? { top: hole.y + hole.height + BUBBLE_GAP, left: Math.max(BUBBLE_GAP, hole.x) } : null);

export { bubbleFallback };
