/* @layer renderer-components @kind util */
import { MARK_TRACK, WIDTH_TRACKS } from './listbox.constants';
import type { ListboxColumn } from './listbox.type';

const fillIndexOf = <T>(columns: readonly ListboxColumn<T>[]): number => {
  if (columns.some((column) => column.width === 'fill')) return -1;
  const free = columns.findIndex((column) => column.width === undefined && column.map === undefined);
  return free === -1 ? 0 : free;
};

const gridTemplate = <T>(columns: readonly ListboxColumn<T>[], withMark: boolean): string => {
  const fill = fillIndexOf(columns);
  const tracks = columns.map((column, index) => WIDTH_TRACKS[index === fill ? 'fill' : column.width ?? 'auto']);
  const body = tracks.length > 0 ? tracks : [WIDTH_TRACKS.fill];
  return (withMark ? [MARK_TRACK, ...body] : body).join(' ');
};

export { gridTemplate };
