# KanbanBoard

A board of cards in named columns, such as tasks by state, where the user drags a card within a column or to another one.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { KanbanBoard } from '@drizztdourden08/tessera';
```

The source is `src/composites/KanbanBoard/KanbanBoard.tsx`. Its gallery page is Composites · Data views/KanbanBoard (`#/story/composites-kanbanboard--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Cards in columns the user drags between, such as tasks by state.

KanbanBoard keeps the move, the keys, the counts and the fold the same in every board, so an app only draws its cards.

## Use it when

- Items move through a few named stages, such as todo, doing, review and done, and the user sorts them by hand.
- The app names the columns and owns the cards; the board draws them and reports each move.
- Each column may fold to a narrow rail, so the user can keep a long board in view.

## Use something else when

- The items are one flat list the user reorders, with no stages. Use [RowGrid](RowGrid.md) instead.
- The user browses, sorts or filters many records in rows and columns. Use [DataTable](DataTable.md) instead.
- The cards are catalogue items with media and facts, laid out in a grid. Use [ItemCard](ItemCard.md) instead.

## Rules

- Pass columns as { id, title, cards } where each card has an id; the app decides the columns and nothing is fixed.
- Keep the columns in the app: onMove gets { cardId, from, to } with a columnId and an index each, and the app changes its data.
- Read to.index as the place the card has after the move, in its new column; moveCard applies a move to the columns for you.
- Draw the inside of a card with renderCard, such as a title and tag badges; the board draws the frame and the grip.
- Pass cardLabel to name a card in the grip and in the announcement; it falls back to the card id.
- Give the board a height, such as a flex child or a fixed block size: each column scrolls on its own and the board scrolls sideways.
- Put a badge after the count of a column header, such as 2 quiet, with badge on the column; put a control at the header end, such as an Add button, with action.
- Both are drawn from the column data, so a column that has neither looks as before; a folded column hides its action and keeps its badge on the rail.
- Put a form or a control above the cards, such as an inline add form, with top on the column; it is not a card, so it takes no drag slot, and a folded column hides it.
- Fold columns with collapsed and onCollapsedChange, or let defaultCollapsed start them folded; both take column ids.

## Accessibility

- The board and each column are named groups, and each column holds a named list of cards.
- The grip is a button on each card: drag it, or press Up and Down to move within the column and Left and Right to move to the next column.
- Keys skip a folded column, and focus stays on the moved card.
- Each move is announced in a polite live region with the card, the column and the place, such as Fix login moved to Doing, position 2 of 4.
- Every control is at least 24 pixels, and the fold button names its column and says if it is expanded.

## Example

```tsx
import { useState } from 'react';
import { Badge, KanbanBoard, Text, moveCard } from '@drizztdourden08/tessera';
import type { KanbanColumn } from '@drizztdourden08/tessera';

interface Task {
  id: string;
  title: string;
  tag: string;
}

const START: KanbanColumn<Task>[] = [
  { id: 'todo', title: 'To do', cards: [{ id: 't1', title: 'Fix login', tag: 'bug' }] },
  { id: 'doing', title: 'Doing', cards: [] },
  { id: 'done', title: 'Done', cards: [] },
];

const Tasks = () => {
  const [columns, setColumns] = useState(START);
  return (
    <KanbanBoard
      label="Sprint"
      columns={columns}
      cardLabel={(task) => task.title}
      renderCard={(task) => (
        <>
          <Text>{task.title}</Text>
          <Badge variant="inline" value={task.tag} color="info" />
        </>
      )}
      onMove={(move) => setColumns((now) => moveCard(now, move))}
    />
  );
};
```

## Props

- `columns`: `readonly KanbanColumn<Card>[]`.
- `renderCard`: `(card: Card) => ReactNode`.
- `onMove`: `(move: KanbanMove) => void`.
- `cardLabel` (optional): `(card: Card) => string`.
- `label` (optional): `string`.
- `collapsed` (optional): `readonly string[]`.
- `defaultCollapsed` (optional): `readonly string[]`.
- `onCollapsedChange` (optional): `(columnId: string, collapsed: boolean) => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-primary-bright`, `--c-primary-soft`, `--c-text-dim`, `--c-text-muted`, `--opacity-muted`, `--size-1`, `--size-2`, `--size-288`, `--size-48`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-xs`, `--weight-semi`.

## Also exported from this folder

`moveCard`.
