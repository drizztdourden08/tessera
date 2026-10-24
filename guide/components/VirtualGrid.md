# VirtualGrid

A very long grid of equal tiles, such as sprite thumbnails, in sections if wanted, where only the rows in view are drawn, with the arrow keys to move between tiles.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { VirtualGrid } from '@drizztdourden08/tessera';
```

The source is `src/composites/VirtualGrid/VirtualGrid.tsx`. Its gallery page is Composites · Lists/VirtualGrid (`#/story/composites-virtualgrid--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A long grid of equal tiles drawn only where it is in view.

VirtualGrid draws only the rows of tiles in view, so a grid of any size opens at once and scrolls smoothly.

## Use it when

- The grid has thousands of tiles, such as every frame of a sprite sheet or every image of a folder, and drawing them all would slow the page.
- Every tile is the same size and the app draws the content of each tile.
- The tiles fall into groups, such as the folders of a library, each under a header row that collapses.
- The user moves through the tiles with the keys and the grid must scroll to follow.

## Use something else when

- A long list of rows, one per line. Use [VirtualList](VirtualList.md) instead.
- A short set of cards that can all be drawn at once. Use [ItemCard](ItemCard.md) instead.
- Records with columns the user sorts, groups or resizes. Use [DataTable](DataTable.md) instead.

## Rules

- Give it items, getKey and renderItem; getKey returns a stable id, never the position.
- Give label a name for the grid, since the tiles are drawn without a heading of their own.
- Size the grid from its parent: it fills the height of its box and scrolls inside it.
- Pick a square tile with tileSize, the name of a size token such as size-96; tileWidth and tileHeight size a tile that is not square and win over tileSize; the columns that fit the width of the box are worked out from the width, and a raw pixel number is not accepted.
- Give sections instead of items to group the tiles: each section has a key, a label and its items, and an optional count to show in the header instead of the number of items.
- The index given to renderItem, getKey and onActiveChange runs through all the sections, and onActiveChange is not called for a header.
- A header spans all the columns and takes part in the scroll like a row of its own; its height is fixed by the grid.
- Hold the collapsed sections with collapsed (a list of keys) and onToggleSection(key, collapsed), or leave both out and give defaultCollapsed for the start; keep the list stable between renders.
- Give scrollRef the ref of a marquee container and spread bind of useMarqueeSelect on the grid; every tile carries data-marquee-key set to its getKey, and overlay takes the MarqueeBox that follows the content.
- Give ref a ref and call scrollToIndex(index, align) to scroll a tile into view; align is start, center, end or nearest, and nearest is the default; the index of a tile in a collapsed section scrolls to its header.
- Keep renderItem cheap and free of its own size; the tile cuts what does not fit, and the tile pads its content.
- Raise overscan for tiles that load slowly while the user scrolls fast; the default is 2 rows on each side.
- Use onActiveChange to follow the tile that holds focus, such as to show its detail beside the grid.

## Accessibility

- The grid is a grid of cells with the row and column of each, so a reader hears where the tile is among thousands.
- One tile is in the tab order; the four arrows move by a tile or a row, Home and End go to the start or end of the row, Ctrl with them goes to the first or last tile, and Page Up and Page Down move by a screen of rows.
- A header is a cell that says if it is open; Enter, Space and a click toggle it, Left closes it and Right opens it, and Right on an open header goes to its first tile.
- Up and Down move between the tiles and the headers, and Left and Right step through tiles to the next header and back.
- A tile or a header that holds focus stays drawn when it scrolls out of view, so the keys keep working.
- Keys act only when the tile itself has focus, so a field inside a tile keeps its own arrow keys.

## Example

```tsx
import { VirtualGrid } from '@drizztdourden08/tessera';

interface Frame {
  id: string;
  name: string;
}

const Thumbnails = ({ frames }: { frames: Frame[] }) => (
  <VirtualGrid
    label="Frames"
    items={frames}
    getKey={(frame) => frame.id}
    renderItem={(frame) => frame.name}
    tileSize="size-64"
  />
);

interface Folder {
  key: string;
  label: string;
  items: Frame[];
}

const Library = ({ folders }: { folders: Folder[] }) => (
  <VirtualGrid
    label="Library"
    sections={folders}
    getKey={(frame) => frame.id}
    renderItem={(frame) => frame.name}
    tileWidth="size-128"
    tileHeight="size-64"
    defaultCollapsed={['archive']}
  />
);
```

## Props

- `items` (optional): `readonly T[] | undefined`.
- `sections` (optional): `undefined | readonly VirtualGridSection<T>[]`.
- `getKey`: `(item: T, index: number) => string`.
- `renderItem`: `(item: T, index: number) => ReactNode`.
- `label`: `string`.
- `tileSize` (optional): `VirtualSize`. Default `'size-96'`.
- `tileWidth` (optional): `VirtualSize`.
- `tileHeight` (optional): `VirtualSize`.
- `overscan` (optional): `number`.
- `collapsed` (optional): `readonly string[]`.
- `defaultCollapsed` (optional): `readonly string[]`.
- `onToggleSection` (optional): `(key: string, collapsed: boolean) => void`.
- `onActiveChange` (optional): `(index: number) => void`.
- `scrollRef` (optional): `Ref<HTMLElement>`.
- `bind` (optional): `VirtualGridBind`.
- `overlay` (optional): `ReactNode`.
- `ref` (optional): `Ref<VirtualGridHandle>`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-bg`, `--c-border`, `--c-focus`, `--c-hairline`, `--c-hover`, `--c-surface`, `--radius-md`, `--size-16`, `--size-32`, `--size-96`, `--space-sm`, `--space-xs`, `--text-sm`, `--vg-headers`, `--vg-heads`, `--vg-row`, `--vg-rows`.
