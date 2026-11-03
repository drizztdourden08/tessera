/* @layer stories @kind data */
import type { BreadcrumbSegment } from '../../../src/composites';

const noop = (): void => undefined;

const TRAIL: readonly BreadcrumbSegment[] = [
  { id: 'project', label: 'Mossgrove', title: 'Project root', icon: 'folder' },
  {
    id: 'art',
    label: 'art',
    siblings: [
      { id: 'audio', label: 'audio', icon: 'folder', group: 'Assets', onSelect: noop },
      { id: 'levels', label: 'levels', icon: 'folder', group: 'Assets', onSelect: noop },
      { id: 'notes', label: 'notes', icon: 'folder', group: 'Other', onSelect: noop },
    ],
  },
  { id: 'sprites', label: 'sprites' },
  {
    id: 'heroes',
    label: 'heroes',
    siblings: [
      { id: 'enemies', label: 'enemies', icon: 'folder', onSelect: noop },
      { id: 'props', label: 'props', icon: 'folder', onSelect: noop },
    ],
  },
  { id: 'idle', label: 'idle-walk-cycle', title: 'sprites/heroes/idle-walk-cycle', icon: 'image' },
];

export { TRAIL };
