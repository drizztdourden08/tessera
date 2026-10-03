/* @layer stories @kind data */
import { Span, Tag } from '../../../src/primitives';
import type { EngineColumn } from './engine-grid.type';

const ENGINE_COLUMNS: readonly EngineColumn[] = [
  { path: 'name', label: 'Location', track: 'minmax(max-content, 1fr)' },
  { path: 'game', label: 'Game' },
  { path: 'region', label: 'Region' },
  { path: 'item', label: 'Item', render: (row) => (row.progression ? <Tag>{row.item}</Tag> : <Span tone="muted">{row.item}</Span>) },
  { path: 'checkedBy', label: 'Checked by' },
  { path: 'sphere', label: 'Sphere', align: 'end' },
];

const GROUPINGS = {
  none: [],
  game: ['game'],
  progression: ['progression'],
  sphere: ['sphere'],
  'game, then region': ['game', 'region'],
} as const satisfies Record<string, readonly string[]>;

const GROUPING_NAMES = Object.keys(GROUPINGS) as (keyof typeof GROUPINGS)[];

export { ENGINE_COLUMNS, GROUPINGS, GROUPING_NAMES };
