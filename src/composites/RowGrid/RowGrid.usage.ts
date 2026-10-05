/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A short list the user edits in place, one row per item and one input per column, such as the players of a session.',
  useWhen: [
    'Each item has the same few fields, and the user adds, removes and reorders the items.',
    'The list is short, tens of rows at most, and every row stays editable.',
  ],
  avoidWhen: [
    { case: 'The user browses, sorts or picks from many records.', use: 'DataTable' },
    { case: 'Each item has many fields or a nested shape.', use: 'RecordEditor' },
    { case: 'Each row is a name and one value of a map.', use: 'KeyValueEditor' },
    { case: 'The rows are read only with a few actions.', use: 'ListItemRow' },
  ],
  rules: [
    'Give each column a min and a max in pixels; the grid stays a table while every min fits.',
    'Mark the least needed column fold, so it moves to a second line before the rows turn into cards.',
    'Put the field that names the row first: in cards it heads the card.',
    'Keep the rows in the app and change them in onAdd, onRemove and onMove; the grid only draws them.',
    'Pass error per column as a sentence that says how to fix it.',
  ],
  a11y: [
    'Each row is a group named after rowLabel, and each input is named by its column.',
    'Ctrl and Up or Down moves to the same column in the row above or below.',
    'The grip moves its row with Up and Down; the row menu has Move up and Move down too.',
    'Adding, removing and moving a row is announced, and focus lands on the next useful control.',
  ],
  tree: {
    path: ['a value the user sets', 'a short list of items with the same few fields'],
    rule: 'RowGrid edits a short list row by row, a table when wide and cards when narrow, the same way in every app.',
  },
  example: `import { RowGrid, TextInput } from '@drizztdourden08/tessera';
import type { RowGridColumn } from '@drizztdourden08/tessera';

interface Player {
  id: string;
  name: string;
}

interface PlayersProps {
  players: Player[];
  rename: (id: string, name: string) => void;
  add: () => void;
  remove: (id: string) => void;
  move: (from: number, to: number) => void;
}

const Players = ({ players, rename, add, remove, move }: PlayersProps) => {
  const columns: RowGridColumn<Player>[] = [{
    id: 'name',
    label: 'Name',
    min: 120,
    max: 260,
    error: (player) => (player.name.trim() === '' ? 'Give the player a name.' : undefined),
    cell: (player) => <TextInput value={player.name} onChange={(event) => rename(player.id, event.currentTarget.value)} />,
  }];
  return (
    <RowGrid
      label="Players"
      rows={players}
      columns={columns}
      rowKey={(player) => player.id}
      rowLabel={(player) => player.name}
      numbered
      onAdd={add}
      addLabel="Add player"
      onRemove={remove}
      onMove={move}
    />
  );
};
`,
  propsHash: '9331047efc2c0e60',
} satisfies ComponentUsage;

export { usage };
