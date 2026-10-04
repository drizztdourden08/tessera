/* @layer stories @kind data */
import type { PreviewUsage } from '../_shared/preview-usage.type';

const ROW_GRID_USAGE = {
  job: 'A short list the user edits in place, one row per item and one input per column, such as the players of a session.',
  useWhen: [
    'Each item has the same few fields, and the user adds, removes and reorders the items.',
    'The list is short, tens of rows at most, and every row stays editable.',
  ],
  avoidWhen: [
    { case: 'The user browses, sorts or picks from many records.', use: 'DataTable' },
    { case: 'Each item has many fields or a nested shape.', use: 'RecordEditor' },
    { case: 'The rows are read-only with a few actions.', use: 'ListItemRow' },
  ],
  rules: [
    'Give each column a min and a max in pixels; the grid stays a table while every min fits.',
    'Mark the least needed column fold, so it moves to a second line before the rows turn into cards.',
    'Put the field that names the row first: in cards it heads the card.',
    'Pass error per column as a sentence that says how to fix it.',
  ],
  a11y: [
    'Each row is a group named after its first field, and each input is named by its column.',
    'Ctrl and Up or Down moves to the same column in the row above or below.',
    'The grip moves its row with Up and Down; the row menu has Move up and Move down too.',
    'Adding, removing and moving a row is announced, and focus lands on the next useful control.',
  ],
  example: `import { RowGrid } from '@drizztdourden08/tessera';

<RowGrid
  label="Players"
  rows={players}
  rowKey={(player) => player.id}
  rowLabel={(player) => player.name}
  columns={[
    { id: 'name', label: 'Name', min: 120, max: 260, cell: (p) => <TextInput value={p.name} onChange={rename(p)} /> },
    { id: 'game', label: 'Game', min: 160, max: 300, cell: (p) => <Select options={games} value={p.game} onChange={pickGame(p)} /> },
    { id: 'overrides', label: 'Overrides', min: 168, max: 200, fold: true, cell: (p) => <Overrides player={p} /> },
  ]}
  numbered
  onAdd={addPlayer}
  onRemove={removePlayer}
  onMove={movePlayer}
/>`,
} satisfies PreviewUsage;

export { ROW_GRID_USAGE };
