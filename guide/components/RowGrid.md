# RowGrid

A short list the user edits in place, one row per item and one input per column, such as the players of a session.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { RowGrid } from '@drizztdourden08/tessera';
```

The source is `src/composites/RowGrid/RowGrid.tsx`. Its gallery page is Composites · Forms/RowGrid (`#/story/composites-rowgrid--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A short list of items with the same few fields.

RowGrid edits a short list row by row, a table when wide and cards when narrow, the same way in every app.

## Use it when

- Each item has the same few fields, and the user adds, removes and reorders the items.
- The list is short, tens of rows at most, and every row stays editable.

## Use something else when

- The user browses, sorts or picks from many records. Use `DataTable` instead.
- Each item has many fields or a nested shape. Use `RecordEditor` instead.
- Each row is a name and one value of a map. Use [KeyValueEditor](KeyValueEditor.md) instead.
- The rows are read only with a few actions. Use `ListItemRow` instead.

## Rules

- Give each column a min and a max in pixels; the grid stays a table while every min fits.
- Mark the least needed column fold, so it moves to a second line before the rows turn into cards.
- Put the field that names the row first: in cards it heads the card.
- Keep the rows in the app and change them in onAdd, onRemove and onMove; the grid only draws them.
- Pass error per column as a sentence that says how to fix it.
- Pass selectedKey for the row the app has open, such as the row whose Edit button is pressed; the app keeps it.

## Accessibility

- Each row is a group named after rowLabel, and each input is named by its column; the selected row carries aria-current.
- Ctrl and Up or Down moves to the same column in the row above or below.
- The grip moves its row with Up and Down; the row menu has Move up and Move down too.
- Adding, removing and moving a row is announced, and focus lands on the next useful control.

## Example

```tsx
import { RowGrid, TextInput } from '@drizztdourden08/tessera';
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
```

## Props

- `label`: `string`.
- `rows`: `readonly Row[]`.
- `columns`: `readonly RowGridColumn<Row>[]`.
- `rowKey`: `(row: Row) => string`.
- `rowLabel` (optional): `(row: Row, index: number) => string`.
- `selectedKey` (optional): `string`.
- `numbered` (optional): `boolean`.
- `density` (optional): `RowGridDensity`, one of `'comfortable'`, `'compact'`.
- `onAdd` (optional): `() => void`.
- `addLabel` (optional): `string`. Default `rowGrid.add`.
- `onRemove` (optional): `(key: string) => void`.
- `onMove` (optional): `(from: number, to: number) => void`.
- `rowMenu` (optional): `(row: Row, index: number) => readonly MenuItem[]`.
- `summary` (optional): `ReactNode`.
- `empty` (optional): `ReactNode`. Default `rowGrid.empty`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-bg`, `--c-border`, `--c-border-strong`, `--c-danger-bright`, `--c-hairline`, `--c-hover`, `--c-layer`, `--c-primary`, `--c-primary-bright`, `--c-primary-soft`, `--c-selected`, `--c-surface`, `--c-text-dim`, `--c-text-muted`, `--control-h-md`, `--control-h-sm`, `--opacity-muted`, `--radius-md`, `--row-grid-max`, `--row-grid-tracks`, `--size-1`, `--size-160`, `--size-2`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--transition-fast`.
