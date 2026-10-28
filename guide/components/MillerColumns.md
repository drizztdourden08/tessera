# MillerColumns

Side by side columns for a nested set, such as folders: picking a folder in one column shows its children in the next, and the pick is shared with the app.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { MillerColumns } from '@drizztdourden08/tessera';
```

The source is `src/composites/MillerColumns/MillerColumns.tsx`. Its gallery page is Composites · Lists/MillerColumns (`#/story/composites-millercolumns--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- The user walks down a hierarchy one level at a time and keeps the levels above in view, as in a file browser.
- A file browser offers columns beside a grid and a list, and all of them pick the same keys.

## Use something else when

- The tree is shown as one list that folds open and closed. Use [Tree](Tree.md) instead.
- The items are groups of sessions with one picked row. Use `GroupTree` instead.
- There is one flat list of items. Use [VirtualList](VirtualList.md) instead.

## Rules

- Pass items, the first column, with getKey, getChildren and renderItem; getChildren gives the children of a folder, or nothing for a leaf that opens.
- Pass selection, the picked keys and onChange; the set is the same for every column, so a grid or a list of the same app can use it too.
- A press picks one item in a column and opens its children in the next column; Ctrl and Shift pick several in that column and close the columns after it.
- Keep the open items in the app with path and onPathChange, or pass defaultPath and let the columns keep them.
- Pass onOpen to hear Enter or a double click on a leaf.
- Pass getLabel for type ahead in a column.
- Pass columnWidth to size the columns and rowSize for the height of the rows.
- Each column is a VirtualList, so a column of thousands of items draws only the rows in view; the columns scroll sideways inside the box, so give it a height.

## Accessibility

- Each column is a list box named with the label and its number, and the row that opens a column stays marked.
- Right goes into the open folder and picks its first item, and Left goes back to the folder in the column before.
- Up, Down, Home, End and a typed letter move inside a column, and the picked items are marked with aria-selected.

## Example

```tsx
import { useState } from 'react';
import { MillerColumns } from '@drizztdourden08/tessera';

type Entry = { id: string; name: string; children?: Entry[] };

const Browser = ({ entries }: { entries: Entry[] }) => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  return (
    <MillerColumns
      label="Files"
      items={entries}
      getKey={(entry) => entry.id}
      getChildren={(entry) => entry.children}
      renderItem={(entry) => entry.name}
      selection={{ selected: picked, onChange: setPicked }}
    />
  );
};
```

## Props

- `items`: `readonly T[]`.
- `getKey`: `(item: T) => string`.
- `getChildren`: `(item: T) => readonly T[] | undefined`.
- `renderItem`: `(item: T) => ReactNode`.
- `label`: `string`.
- `selection`: `MillerColumnsSelection`.
- `getLabel` (optional): `(item: T) => string`.
- `path` (optional): `readonly string[]`.
- `defaultPath` (optional): `readonly string[]`.
- `onPathChange` (optional): `(path: readonly string[]) => void`.
- `onOpen` (optional): `(item: T) => void`.
- `columnWidth` (optional): `VirtualSize`. Default `'size-224'`.
- `rowSize` (optional): `VirtualListRowSize`, one of `'compact'`, `'normal'`, `'roomy'`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-bg`, `--c-border`, `--c-selected`, `--c-text-muted`, `--miller-column-w`, `--radius-md`, `--space-sm`, `--space-xs`.
