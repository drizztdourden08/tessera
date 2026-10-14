/* @layer stories @kind data */
import type { StackedBarSegment } from '../../../src/primitives';

const CATEGORY_SEGMENTS: readonly StackedBarSegment[] = [
  { id: 'rose', label: 'Rose', value: 3, color: 'rose' },
  { id: 'orange', label: 'Orange', value: 3, color: 'orange' },
  { id: 'amber', label: 'Amber', value: 3, color: 'amber' },
  { id: 'lime', label: 'Lime', value: 3, color: 'lime' },
  { id: 'green', label: 'Green', value: 3, color: 'green' },
  { id: 'teal', label: 'Teal', value: 3, color: 'teal' },
  { id: 'cyan', label: 'Cyan', value: 3, color: 'cyan' },
  { id: 'blue', label: 'Blue', value: 3, color: 'blue' },
  { id: 'violet', label: 'Violet', value: 3, color: 'violet' },
  { id: 'pink', label: 'Pink', value: 3, color: 'pink' },
];

const POOL_SEGMENTS: readonly StackedBarSegment[] = [
  { id: 'items', label: 'Items in pool', value: 128, color: 'success', description: 'Items the shuffle places that are neither upgrades nor filler' },
  { id: 'upgrades', label: 'Upgrades', value: 12, color: 'violet', description: 'Capacity upgrades, each in the place of a filler item' },
  { id: 'filler', label: 'Filler', value: 54, color: 'warning', description: 'Balance filler still in the pool' },
  { id: 'fixed', label: 'Fixed', value: 9, color: 'danger', description: 'Spots settled before the shuffle' },
  { id: 'prizes', label: 'Prizes', value: 10, color: 'info', description: 'The boss rewards, placed from their own pool' },
];

export { CATEGORY_SEGMENTS, POOL_SEGMENTS };
