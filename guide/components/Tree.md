# Tree

A long tree of items that fold open, drawn only where it is in view, with the keys of a tree, many picked at once, and a drag that reorders or drops into a folder.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Tree } from '@drizztdourden08/tessera';
```

The source is `src/composites/Tree/Tree.tsx`. Its gallery page is Composites · Lists/Tree (`#/story/composites-tree--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- The items nest, such as layers in groups, files in folders or outlines, and the tree may hold thousands of rows.
- The user picks one or many nodes, moves them by drag or by keys, or drops them into a folder.
- The children of a folder load when it opens, or a search must keep the folders above its matches.

## Use something else when

- The items are sessions or players in groups, counted, with one picked row. Use `GroupTree` instead.
- The user walks a folder path as side by side columns. Use [MillerColumns](MillerColumns.md) instead.
- The list is flat and long. Use [VirtualList](VirtualList.md) instead.

## Rules

- Pass items, the top level, with getKey, getChildren and getLabel; getChildren gives the children of an item, or nothing for a leaf.
- A folder that is empty gives an empty list; a folder whose children are not loaded yet gives nothing and says so with isBranch.
- Pass renderLead, renderLabel and renderTrail to fill the three slots of a row, before the text, as the text and after it; each gets the item and its state.
- The tree has no toggles of its own for visibility or lock; put them in renderTrail.
- Keep the open folders in the app with expandedKeys and onExpandedChange, or pass defaultExpandedKeys and let the tree keep them.
- Pass selection with the picked keys and onChange to pick; mode single picks one row on each press, and mode multiple, the default, takes Ctrl, Shift, Space and Ctrl and A through useSelectionModel.
- Pass openOnPick to fold a folder with the same press that picks it, and onActivate to hear Enter or a double click on a row.
- Pass onLoadChildren and loadingKeys for lazy children: it is called once when a folder opens with no children yet, the folder shows a spinner while its key is in loadingKeys, and the app then gives its children.
- Pass filter to keep the items it accepts and the folders above them; those folders show open while the filter runs, and the tree does not reorder.
- Pass reorder to move rows: onMove gets the keys, the parentKey, the index among the children of that parent once the moved keys are out, and into, true for a drop on a folder.
- A drag shows a line at the gap or a mark on the folder it drops into; hold over a closed folder and it opens after springDelay, 600 ms by default.
- Pass maxDepth to stop a drop that would nest deeper, and canDrop to refuse a move; a folder cannot take itself or its own children.
- Alt with Up or Down moves the row among its siblings, Alt with Right drops it into the sibling above, and Alt with Left lifts it out of its parent; each move is announced in a polite live region.
- Pass renderThumbnail in reorder to show the first three rows in the drag ghost.
- Pass guides to draw a line for each level, with the branch of the picked row lit; pass rowSize compact for 24 px rows.
- Give the tree a height, since it scrolls inside its box and draws only the rows in view; scrollToKey on the ref brings a row into view.

## Accessibility

- It is a tree with tree items that say their level, their place among their siblings and whether they are open.
- One row takes Tab, the others take the arrows; Right opens a folder or goes to its first child, Left closes it or goes to its parent, Home and End go to the ends, and the star opens all siblings.
- A typed letter moves focus to the next row whose label starts with it.
- The moves by key are announced, since a drag changes no focus text.

## Example

```tsx
import { useState } from 'react';
import { Tree } from '@drizztdourden08/tessera';

type Entry = { id: string; name: string; children?: Entry[] };

const Files = ({ entries }: { entries: Entry[] }) => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  return (
    <Tree
      label="Files"
      items={entries}
      getKey={(entry) => entry.id}
      getChildren={(entry) => entry.children}
      getLabel={(entry) => entry.name}
      selection={{ selected: picked, onChange: setPicked }}
    />
  );
};
```

## Props

- `items`: `readonly T[]`.
- `getKey`: `(item: T) => string`.
- `getChildren`: `(item: T) => readonly T[] | undefined`.
- `getLabel`: `(item: T) => string`.
- `label`: `string`.
- `isBranch` (optional): `(item: T) => boolean`.
- `renderLead` (optional): `(item: T, state: TreeRowState) => ReactNode`.
- `renderLabel` (optional): `(item: T, state: TreeRowState) => ReactNode`.
- `renderTrail` (optional): `(item: T, state: TreeRowState) => ReactNode`.
- `expandedKeys` (optional): `readonly string[]`.
- `defaultExpandedKeys` (optional): `readonly string[]`.
- `onExpandedChange` (optional): `(keys: readonly string[]) => void`.
- `selection` (optional): `TreeSelection`.
- `onActivate` (optional): `(item: T) => void`.
- `openOnPick` (optional): `boolean`. Default `false`.
- `onLoadChildren` (optional): `(item: T) => void`.
- `loadingKeys` (optional): `ReadonlySet<string>`.
- `filter` (optional): `(item: T) => boolean`.
- `reorder` (optional): `TreeReorder`.
- `guides` (optional): `boolean`.
- `rowSize` (optional): `TreeRowSize`, one of `'compact'`, `'normal'`. Default `'normal'`.
- `overscan` (optional): `number`.
- `emptyLabel` (optional): `string`.
- `ref` (optional): `Ref<TreeHandle>`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-dim`, `--c-primary-soft`, `--c-selected`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--opacity-disabled`, `--radius-pill`, `--radius-sm`, `--row-inset`, `--size-1`, `--size-16`, `--size-20`, `--size-24`, `--size-28`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--transition-fast`, `--tree-count`, `--tree-index`, `--tree-row-indent`.
