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
- Pass onCardOpen to open a card: it gets the card id on a plain click of the card, never after a drag and never for a click inside a button, link, input, textarea, select or an element with role menu, menuitem or button, so controls inside renderCard keep their own click.
- Give cards a group key (group on the card data) to frame them: consecutive cards in one column with the same key sit inside one frame with a slim top bar, such as the subtasks of one parent. Cards with no key look as before.
- Pass renderGroupHeader to draw the bar from the key, such as the parent icon and title: it gets the group key and the column, and a long header is cut with an ellipsis.
- Pass fold, the third argument of renderGroupHeader, to the chevron of a RecordHeader to let the group fold: fold.open says if the cards show, fold.toggle flips it and fold.controls names the list for aria-controls. A folded group hides its cards and keeps its bar; the board keeps the state, and a group key folds in every column that holds it.
- The board never changes a card group. A move reports the neighbours the card has after it, above and below (card ids, left out at an end), so the app sets the group of the moved card and the frame forms again from the new order and keys.
- Pass cardLabel to name a card in the grip and in the announcement; it falls back to the card id.
- Pass cardEdgeTone to draw a coloured edge on some cards, such as danger for a card that needs the user; return undefined for a card with no edge.
- Give the board a height, such as a flex child or a fixed block size: each column scrolls on its own and the board scrolls sideways.
- Set columnWidth to fill so the columns share the board width instead of a fixed width; each keeps a minimum, and the board scrolls sideways when the minimums do not fit.
- Put a badge after the count of a column header, such as 2 quiet, with badge on the column; put a control at the header end, such as an Add button, with action.
- Both are drawn from the column data, so a column that has neither looks as before; a folded column hides its action and keeps its badge on the rail.
- Give a column header when its head is more than text, such as the parent record of a group-by-parent board with its icon, code and link; it takes the place of the title text in the head, beside the count, badge, action and fold button.
- Keep title on such a column: it stays the name of the column, the list and the fold button, and the text of every announcement. The header is drawn only on an open column; a folded rail still shows title.
- A link or button in header works as it does anywhere: only the card grip starts a drag, so a press on the header never moves a column or a card.
- Put a form or a control above the cards, such as an inline add form, with top on the column; it is not a card, so it takes no drag slot, and a folded column hides it.
- Pass columnHeight="fit" to size each column to its cards instead of the board height; a column taller than the board still scrolls its cards.
- Pass grip={false} to hide the drag grip: the cards no longer drag by pointer, and the arrow keys still move a card from a hidden grip button that shows a focus ring on the card.
- Pass foldable={false} to remove the fold chevron from every column; a column listed in collapsed or defaultCollapsed then stays open.
- Pass stack to stack the columns top to bottom when the board is under 420 px wide, through a container query on a wrapper; the default board scrolls sideways at any width.
- Fold columns with collapsed and onCollapsedChange, or let defaultCollapsed start them folded; both take column ids.

## Accessibility

- The board and each column are named groups, and each column holds a named list of cards.
- The grip is a button on each card: drag it, or press Up and Down to move within the column and Left and Right to move to the next column.
- OnCardOpen has no key of its own: Enter and Space on the grip button press it, so the grip keeps the keyboard and a keyboard user opens a card with a button the app puts inside renderCard.
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
  group?: string;
}

const START: KanbanColumn<Task>[] = [
  { id: 'todo', title: 'To do', cards: [
    { id: 't1', title: 'Fix login', tag: 'bug', group: 'auth' },
    { id: 't2', title: 'Add reset link', tag: 'feature', group: 'auth' },
    { id: 't3', title: 'Update docs', tag: 'chore' },
  ] },
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
      renderGroupHeader={(group) => group}
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
- `onCardOpen` (optional): `(cardId: string) => void`.
- `renderGroupHeader` (optional): `(group: string, column: KanbanColumn<Card>, fold: KanbanGroupFold) => ReactNode`.
- `cardLabel` (optional): `(card: Card) => string`.
- `cardEdgeTone` (optional): `(card: Card) => CardTone | undefined`.
- `columnWidth` (optional): `KanbanColumnWidth`, one of `'fixed'`, `'fill'`. Default `'fixed'`.
- `columnHeight` (optional): `KanbanColumnHeight`, one of `'stretch'`, `'fit'`. Default `'stretch'`.
- `grip` (optional): `boolean`. Default `true`.
- `foldable` (optional): `boolean`.
- `stack` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `collapsed` (optional): `readonly string[]`.
- `defaultCollapsed` (optional): `readonly string[]`.
- `onCollapsedChange` (optional): `(columnId: string, collapsed: boolean) => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-focus`, `--c-primary-bright`, `--c-primary-soft`, `--c-surface`, `--c-text-dim`, `--c-text-muted`, `--opacity-muted`, `--radius-lg`, `--size-1`, `--size-2`, `--size-224`, `--size-288`, `--size-48`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-xs`, `--weight-semi`.

## Also exported from this folder

`moveCard`.
