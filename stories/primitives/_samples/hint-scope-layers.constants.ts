/* @layer stories @kind data */
import type { ToggleOption } from '../../../src/primitives';

const TRACKER_LAYERS: ToggleOption[] = [
  { value: 'items', label: 'Items', hint: { label: 'Items', description: 'Marks every item still to find' } },
  { value: 'bosses', label: 'Bosses', hint: { label: 'Bosses', description: 'Marks the bosses left to beat' } },
  { value: 'keys', label: 'Keys', hint: { label: 'Keys', description: 'Counts the small keys per dungeon' } },
];

export { TRACKER_LAYERS };
