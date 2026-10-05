/* @layer renderer-components @kind util */
import { BUTTON_TOKEN, COLUMN_MIN } from '../RowGrid.constants';
import type { ColumnSize, GridParts, RowGridLayout } from '../RowGrid.type';

const scaled = (px: number): string => `calc(${px} * var(--size-1))`;

const columnTrack = (column: ColumnSize): string =>
  `minmax(${scaled(column.min ?? COLUMN_MIN)}, ${column.max === undefined ? '1fr' : scaled(column.max)})`;

const endTrack = (parts: GridParts): string =>
  `calc(${parts.endButtons} * ${BUTTON_TOKEN[parts.density]} + ${parts.endButtons - 1} * var(--space-2xs))`;

const lineNames = (at: number, lead: number, cells: number, total: number): string => {
  const names = [at === 0 && 'start', at === lead && 'cells', at === lead + cells && 'end', at === total && 'stop'].filter(Boolean);
  return `[${names.join(' ')}]`;
};

const trackList = (columns: readonly ColumnSize[], parts: GridParts, layout: RowGridLayout): string => {
  const lead = [parts.handle && 'var(--size-24)', parts.numbered && 'var(--size-24)'].filter((track): track is string => Boolean(track));
  const cells = layout === 'cards' ? ['minmax(0, 1fr)'] : columns.filter((column) => layout === 'table' || !column.fold).map(columnTrack);
  const end = parts.endButtons > 0 ? [endTrack(parts)] : [];
  const tracks = [...lead, ...cells, ...end];
  const named = tracks.flatMap((track, at) => [lineNames(at, lead.length, cells.length, tracks.length), track]);
  return [...named, lineNames(tracks.length, lead.length, cells.length, tracks.length)].join(' ');
};

export { trackList };
