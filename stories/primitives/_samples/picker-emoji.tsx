/* @layer stories @kind data */
import { Icon } from '../../../src/primitives';
import type { ListboxCategories, ListboxColumn } from '../../../src/primitives';
import type { Build, Game } from './picker-data';

const STATUS_EMOJI: Readonly<Record<string, string>> = { done: '✅', running: '⏳', failed: '❌', queued: '💤' };

const BUILD_COLUMNS: readonly ListboxColumn<Build>[] = [
  { field: 'name', header: 'Build' },
  { field: 'branch', header: 'Branch', tone: 'muted' },
  { field: 'size', header: 'Size', align: 'end', format: 'bytes' },
  { field: 'finished', header: 'Finished', align: 'end', format: 'date' },
];

const STATUS_COLUMNS: readonly ListboxColumn<Build>[] = [
  {
    field: 'status',
    map: STATUS_EMOJI,
    rules: [{ when: { equals: 'failed', active: true }, show: '🔥' }],
  },
  {
    field: 'name',
    rules: [{ when: { field: 'status', equals: 'failed' }, tone: 'danger' }],
  },
  { field: 'status', id: 'status-word', tone: { done: 'success', running: 'info', failed: 'danger', queued: 'muted' }, inTrigger: false },
  {
    field: 'size',
    align: 'end',
    format: 'bytes',
    tone: (value) => (typeof value === 'number' && value > 2_000_000 ? 'warning' : 'muted'),
    rules: [{ when: { field: 'status', equals: 'running' }, show: 'building', tone: 'info' }],
    empty: 'none yet',
  },
];

const GAME_COLUMNS: readonly ListboxColumn<Game>[] = [
  { field: 'title' },
  { field: 'platform', tone: 'muted' },
  { field: 'year', align: 'end', tone: 'dim' },
];

const GAME_CATEGORIES: ListboxCategories = {
  adventure: { label: 'Adventure', icon: '🗡️' },
  action: { label: 'Action', icon: '💥' },
  puzzle: { label: 'Puzzle', icon: '🧩' },
  handheld: { label: 'Handheld', icon: <Icon name="gamepad-2" size={14} /> },
};

const BUILD_CATEGORIES: ListboxCategories = {
  failed: { label: 'Needs a look', icon: '❌' },
  running: { label: 'In progress', icon: '⏳' },
  queued: { label: 'Waiting', icon: '💤' },
  done: { label: 'Finished', icon: '✅' },
};

const SELECT_CODE = `import { useState } from 'react';
import { Select } from '@drizztdourden08/tessera';
import type { ListboxColumn } from '@drizztdourden08/tessera';

const columns: ListboxColumn<Build>[] = [
  {
    field: 'status',
    map: { done: '✅', running: '⏳', failed: '❌', queued: '💤' },
    rules: [{ when: { equals: 'failed', active: true }, show: '🔥' }],
  },
  {
    field: 'name',
    rules: [{ when: { field: 'status', equals: 'failed' }, tone: 'danger' }],
  },
  {
    field: 'size',
    align: 'end',
    format: 'bytes',
    tone: (value, { selected }) => (selected ? 'primary' : 'muted'),
    empty: 'none yet',
  },
];

const [build, setBuild] = useState<Build | null>(null);

<Select
  items={builds}
  columns={columns}
  value={build}
  onChange={setBuild}
  placeholder="Pick a build"
/>`;

export { BUILD_CATEGORIES, BUILD_COLUMNS, GAME_CATEGORIES, GAME_COLUMNS, SELECT_CODE, STATUS_COLUMNS, STATUS_EMOJI };
