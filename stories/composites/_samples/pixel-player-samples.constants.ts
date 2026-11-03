/* @layer stories @kind data */
import type { PixelPlayerCell, PixelPlayerTag } from '../../../src/composites';

const HEART_TAGS: readonly PixelPlayerTag[] = [
  { id: 'warm', name: 'Warm', from: 0, to: 2 },
  { id: 'cool', name: 'Cool', from: 3, to: 5 },
];

const HEART_CELLS: readonly PixelPlayerCell[] = [
  { id: 'left', x: 0, y: 0, width: 4, height: 8, label: 'Left half' },
  { id: 'right', x: 4, y: 0, width: 4, height: 8, label: 'Right half' },
];

const PLAYER_ZOOMS = ['fit', '1', '2', '4', '8'] as const;

const PLAYER_DIRECTIONS = ['forward', 'reverse', 'pingpong'] as const;

export { HEART_CELLS, HEART_TAGS, PLAYER_DIRECTIONS, PLAYER_ZOOMS };
