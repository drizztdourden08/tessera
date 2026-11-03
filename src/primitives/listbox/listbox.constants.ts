/* @layer renderer-components @kind data */
import type { RowRange } from '../../data/row-window';
import type { ColumnWidth } from './listbox.type';
import type { ListboxWindow } from './listbox-window.type';

const KEY_FIELDS: readonly string[] = ['value', 'id', 'key'];

const LABEL_FIELDS: readonly string[] = ['label', 'name', 'title'];

const DISABLED_FIELD = 'disabled';

const DESCRIPTION_FIELD = 'description';

const WIDTH_TRACKS: Readonly<Record<ColumnWidth, string>> = {
  auto: 'auto',
  fill: 'minmax(0, 1fr)',
  xs: 'var(--size-32)',
  sm: 'var(--size-64)',
  md: 'var(--size-96)',
  lg: 'var(--size-160)',
};

const MARK_TRACK = 'auto';

const PAGE_STEP = 10;

const TYPEAHEAD_PAUSE_MS = 600;

const MIN_DROP_WIDTH = 180;

const ROOM_FOR_DROP_DOWN = 220;

const VIEW_MARGIN = 8;

const MAX_DROP_HEIGHT = 288;

const WINDOW_THRESHOLD = 200;

const WINDOW_OVERSCAN = 10;

const DEFAULT_ROW_SIZE = 32;

const FIRST_RANGE: RowRange = { start: 0, end: 30 };

const EMPTY_RANGE: RowRange = { start: 0, end: 0 };

const FIRST_WINDOW: ListboxWindow = { rowSize: DEFAULT_ROW_SIZE, ranges: [] };

export {
  DESCRIPTION_FIELD,
  DISABLED_FIELD,
  EMPTY_RANGE,
  FIRST_RANGE,
  FIRST_WINDOW,
  KEY_FIELDS,
  LABEL_FIELDS,
  MARK_TRACK,
  MAX_DROP_HEIGHT,
  MIN_DROP_WIDTH,
  PAGE_STEP,
  ROOM_FOR_DROP_DOWN,
  TYPEAHEAD_PAUSE_MS,
  VIEW_MARGIN,
  WIDTH_TRACKS,
  WINDOW_OVERSCAN,
  WINDOW_THRESHOLD,
};
