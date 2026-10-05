/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { RowGridArgs, StoryWidth } from './row-grid-story.type';

const WIDTHS: readonly StoryWidth[] = ['full', '1024', '768', '512', '384'];

const BOXES: readonly StoryWidth[] = ['768', '512', '384'];

const ROW_GRID_ARGS: RowGridArgs = { width: 'full', rows: 'three', density: 'comfortable', numbered: true };

const ROW_GRID_ARG_TYPES: PlaygroundArgTypes<RowGridArgs> = {
  width: { group: 'Layout', control: 'select', options: [...WIDTHS], description: 'The width of the box the grid sits in, in pixels.' },
  rows: { group: 'Content', control: 'select', options: ['three', 'six', 'invalid', 'none'] },
  density: { group: 'Appearance', control: 'select', options: ['comfortable', 'compact'] },
  numbered: { group: 'Content', control: 'boolean', description: 'A row number before the first column.' },
};

const ROW_GRID_CODE = `import { RowGrid } from '@drizztdourden08/tessera';

<RowGrid
  label="Players"
  rows={players}
  rowKey={(player) => player.id}
  rowLabel={(player) => player.name}
  columns={columns}
  numbered
  onAdd={addPlayer}
  addLabel="Add player"
  onRemove={removePlayer}
  onMove={movePlayer}
  rowMenu={(player) => [{ id: 'duplicate', label: 'Duplicate', onSelect: () => duplicate(player) }]}
/>`;

export { BOXES, ROW_GRID_ARG_TYPES, ROW_GRID_ARGS, ROW_GRID_CODE };
