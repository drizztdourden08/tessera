/* @layer stories @kind constants */
import type { DemonstratorAxis } from './Demonstrator.type';

const DEMONSTRATOR_LONE_AXIS: readonly DemonstratorAxis<string>[] = [{ key: '', label: '' }];

const DEMONSTRATOR_TRACKS = {
  grid: { label: 'fit-content(40%)', fill: 'minmax(min-content, 1fr)', fit: 'minmax(min-content, max-content)' },
  scroll: { label: 'max-content', fill: 'minmax(0, 1fr)', fit: 'max-content' },
} as const;

const DEMONSTRATOR_STACKED_TRACKS = {
  named: 'fit-content(40%) minmax(min-content, 1fr)',
  lone: 'minmax(min-content, 1fr)',
} as const;

export { DEMONSTRATOR_LONE_AXIS, DEMONSTRATOR_STACKED_TRACKS, DEMONSTRATOR_TRACKS };
