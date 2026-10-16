/* @layer stories @kind data */
import type { SegmentOption } from '../../../src/primitives';

const SPRITE_DRAW_TOOLS: SegmentOption[] = [
  { value: 'pencil', icon: 'pencil', hint: { label: 'Pencil', description: 'Draws one pixel at a time in the picked colour.' } },
  { value: 'move', icon: 'move', hint: { label: 'Move', description: 'Drags the pose inside its frame.' } },
  { value: 'erase', icon: 'trash-2', hint: { label: 'Erase', description: 'Clears pixels back to the see-through colour.' } },
];

export { SPRITE_DRAW_TOOLS };
