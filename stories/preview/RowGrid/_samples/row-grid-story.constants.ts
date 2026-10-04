/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../../_template/controls/playground.type';
import type { PreviewChoice } from '../../_shared/preview-shared.type';
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

const WIDTH_PLAN: readonly string[] = [
  '1920 and 1366: a table. Every column stops at its max, so the grid is 1248 px wide and the inputs keep a readable length.',
  '960: a table. The columns share the room between their min and max.',
  '720: the table folds. Overrides moves to a second line in its row, with its label, and the header drops it.',
  '520 and 400: cards. The name heads the card beside the grip, the number and the buttons; the other fields sit under it with their labels, two to a line.',
];

const ROW_GRID_CHOICES: readonly PreviewChoice[] = [
  {
    name: 'Table, then fold, then cards',
    chosen: true,
    why: 'One grid, one set of rows. It stays a table while the columns fit, folds the least needed column into a second line, then turns into cards where every field has its label. The layout follows the box, not the window, so it works in a pane.',
  },
  {
    name: 'Scroll sideways with a sticky first column',
    why: 'Keeps the table, but at 400 px the user scrolls to reach Preset and the buttons, and a scrolled form hides its errors. Good for wide data, poor for inputs.',
  },
  {
    name: 'An expand toggle per row',
    why: 'Hides the extra columns behind a chevron. Each row needs a click to check, and the toggle is one more control in the Tab order of every row.',
  },
  {
    name: 'The first proposal: cells wrap with a label each',
    why: 'Turned down by the owner. Every cell labelled, the number and the actions labelled too, so a card read as a form dump with no head.',
  },
];

const KEYS: readonly string[] = [
  'Tab and Shift+Tab go through the inputs row by row, as in a form.',
  'Ctrl+Up and Ctrl+Down move to the same column in the row above or below.',
  'On the grip, Up and Down move the row; Escape stops a drag. The row menu has Move up, Move down and Duplicate.',
  'Add player puts a row at the end and focuses its name; removing a row focuses the next remove button, or Add player.',
];

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

export { BOXES, KEYS, ROW_GRID_ARG_TYPES, ROW_GRID_ARGS, ROW_GRID_CHOICES, ROW_GRID_CODE, WIDTH_PLAN };
