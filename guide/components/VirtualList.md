# VirtualList

A very long list of rows of one height, where only the rows in view are drawn, with the arrow keys to move between them.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { VirtualList } from '@drizztdourden08/tessera';
```

The source is `src/composites/VirtualList/VirtualList.tsx`. Its gallery page is Composites · Lists/VirtualList (`#/story/composites-virtuallist--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A long list drawn only where it is in view.

VirtualList draws only the rows in view, so a list of any length opens at once and scrolls smoothly.

## Use it when

- The list has thousands of items, such as a log of events or every file of a folder, and drawing them all would slow the page.
- Every row is the same height and the app draws the content of each row.
- The user moves through the rows with the keys and the list must scroll to follow.

## Use something else when

- Records with columns the user sorts, groups or resizes. Use [DataTable](DataTable.md) instead.
- A short list where every row can be drawn at once. Use [ItemList](ItemList.md) instead.
- Files with their size, date and open buttons. Use [FileList](FileList.md) instead.

## Rules

- Give it items, getKey and renderItem; getKey returns a stable id, never the position.
- Give label a name for the list, since the rows are drawn without a heading of their own.
- Size the list from its parent: it fills the height of its box and scrolls inside it.
- Pick rowSize compact, normal or roomy; the height comes from a token and is measured once from the first row, so keep every row the same height.
- Keep renderItem cheap and free of its own height; the row cuts what does not fit.
- Raise overscan for rows that load slowly while the user scrolls fast; the default is 10 rows on each side.
- Use onActiveChange to follow the row that holds focus, such as to show its detail beside the list.

## Accessibility

- The list is a list of items, each with its position and the size of the list, so a reader hears 41 of 5000.
- One row is in the tab order; the arrow keys, Home, End, Page Up and Page Down move focus and scroll to it.
- A row that holds focus stays drawn when it scrolls out of view, so the keys keep working.
- Keys act only when the row itself has focus, so a field inside a row keeps its own arrow keys.

## Example

```tsx
import { VirtualList } from '@drizztdourden08/tessera';

interface Entry {
  id: string;
  text: string;
}

const EventLog = ({ entries }: { entries: Entry[] }) => (
  <VirtualList
    label="Events"
    items={entries}
    getKey={(entry) => entry.id}
    renderItem={(entry) => entry.text}
  />
);
```

## Props

- `items`: `readonly T[]`.
- `getKey`: `(item: T, index: number) => string`.
- `renderItem`: `(item: T, index: number) => ReactNode`.
- `label`: `string`.
- `rowSize` (optional): `VirtualListRowSize`, one of `'compact'`, `'normal'`, `'roomy'`. Default `'normal'`.
- `overscan` (optional): `number`.
- `onActiveChange` (optional): `(index: number) => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-bg`, `--c-border`, `--c-focus`, `--c-hover`, `--radius-md`, `--size-32`, `--size-40`, `--size-48`, `--space-sm`, `--vl-count`, `--vl-index`.
