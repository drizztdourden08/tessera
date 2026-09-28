/* @layer renderer-components @kind constants */
import type { GrowFallback } from './behavior/overflow-probe.type';
import type { TableColumn } from '../../data/table/types';
import type { TrackFallbacks, TrackOverride } from './DataTable.type';

const TRACK_FLOOR = '8rem';

const AUTO_TRACK = `minmax(${TRACK_FLOOR}, 20rem)`;

const GROW_TRACK = `minmax(${TRACK_FLOOR}, 1fr)`;

const TRAILING_TRACK = 'minmax(2.5rem, 1fr)';

const TRAILING_MIN_TRACK = '2.5rem';

const growFitTrack = (width: number): string => `minmax(${TRACK_FLOOR}, ${width}px)`;

const trackFor = (column: TableColumn, growFallback?: GrowFallback, fitFallback?: GrowFallback): string => {
  if (column.width) return `${column.width}px`;
  if (column.fit) {
    const fitted = fitFallback?.get(column.path);
    return fitted === undefined ? AUTO_TRACK : growFitTrack(fitted);
  }
  if (!column.grow) return AUTO_TRACK;
  const fitted = growFallback?.get(column.path);
  return fitted === undefined ? GROW_TRACK : growFitTrack(fitted);
};

const trackList = (
  columns: readonly TableColumn[],
  growFallback?: GrowFallback,
  fitFallback?: GrowFallback,
): string => {
  const trailing = columns.some((column) => column.grow) ? TRAILING_MIN_TRACK : TRAILING_TRACK;
  return [...columns.map((column) => trackFor(column, growFallback, fitFallback)), trailing].join(' ');
};

const trackListWith = (
  columns: readonly TableColumn[],
  { path, width }: TrackOverride,
  fallbacks: TrackFallbacks,
): string =>
  trackList(
    columns.map((column) => (column.path === path ? { ...column, width, grow: false, fit: false } : column)),
    fallbacks.grow,
    fallbacks.fit,
  );

const ABSENT_KEY_LABEL = '-';

const GHOST_ROW_LIMIT = 6;

const TRASH_ICON_PATHS: string[] = [
  'M2.5 4.5h11',
  'M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5',
  'M4.5 4.5l.6 9a1 1 0 0 0 1 .95h3.8a1 1 0 0 0 1-.95l.6-9',
  'M6.75 7.5v4',
  'M9.25 7.5v4',
];

const KEY_RENDERED_KINDS: readonly string[] = ['enum', 'idRef'];

export {
  ABSENT_KEY_LABEL, GHOST_ROW_LIMIT, KEY_RENDERED_KINDS, TRASH_ICON_PATHS, trackList, trackListWith,
};
