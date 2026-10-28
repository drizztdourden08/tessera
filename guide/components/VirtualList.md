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
- For a height of your own pass rowHeight, the name of a size token such as size-64; it wins over rowSize, and a raw pixel number is not accepted.
- Keep renderItem cheap and free of its own height; the row cuts what does not fit.
- Set orientation to horizontal for a strip; itemSize, a size token, is then the width of each item, and the keys are Left and Right; the strip is a box that scrolls sideways, so give the list a height and read it left to right.
- Give selection ({ selected, onChange }) to pick items; the list becomes a multi select listbox with roving focus, and a click, Ctrl, Shift, Ctrl and A, Space, Escape and Shift with an arrow work as in a file manager through useSelectionModel.
- Give getLabel(item, index) for type ahead: a typed letter moves focus to the next item whose label starts with it.
- Give scrollRef, bind and overlay and call getRects on the ref to let useMarqueeSelect pick items of a strip; with a selection every item carries data-marquee-key.
- Raise overscan for rows that load slowly while the user scrolls fast; the default is 10 rows on each side.
- Use onActiveChange to follow the row that holds focus, such as to show its detail beside the list.

## Accessibility

- The list is a list of items, each with its position and the size of the list, so a reader hears 41 of 5000.
- One row is in the tab order; the arrow keys, Home, End, Page Up and Page Down move focus and scroll to it.
- A row that holds focus stays drawn when it scrolls out of view, so the keys keep working.
- Keys act only when the row itself has focus, so a field inside a row keeps its own arrow keys.
- With a selection the list is a listbox of options that say if they are selected, and a horizontal list says so with aria-orientation.

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
- `orientation` (optional): `VirtualAxis`, one of `'vertical'`, `'horizontal'`. Default `'vertical'`.
- `rowSize` (optional): `VirtualListRowSize`, one of `'compact'`, `'normal'`, `'roomy'`. Default `'normal'`.
- `rowHeight` (optional): `VirtualSize`.
- `itemSize` (optional): `VirtualSize`.
- `overscan` (optional): `number`.
- `selection` (optional): `VirtualListSelection`.
- `getLabel` (optional): `(item: T, index: number) => string`.
- `onActiveChange` (optional): `(index: number) => void`.
- `scrollRef` (optional): `Ref<HTMLElement>`.
- `bind` (optional): `VirtualListBind`.
- `overlay` (optional): `ReactNode`.
- `ref` (optional): `Ref<VirtualListHandle>`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-bg`, `--c-border`, `--c-focus`, `--c-hover`, `--c-primary-soft`, `--radius-md`, `--size-32`, `--size-40`, `--size-48`, `--size-96`, `--space-sm`, `--vl-count`, `--vl-index`.
