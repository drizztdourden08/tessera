/* @layer stories @kind data */
import type { FormGroupTab } from '../../../src/composites';

const OPTION_GROUPS: readonly FormGroupTab[] = [
  { id: 'game', label: 'Game Options', count: 41, changed: 3 },
  { id: 'items', label: 'Item & Location Options', count: 12, changed: 3 },
  { id: 'dungeon', label: 'Dungeon Items', count: 6 },
];

const NOT_SAVED = 'Not saved: fix the JSON first.';

export { NOT_SAVED, OPTION_GROUPS };
