# VirtualGrid

A very long grid of equal square tiles, such as sprite thumbnails, where only the rows in view are drawn, with the arrow keys to move between tiles.

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
- Every tile is the same square size and the app draws the content of each tile.
- The user moves through the tiles with the keys and the grid must scroll to follow.

## Use something else when

- A long list of rows, one per line. Use [VirtualList](VirtualList.md) instead.
- A short set of cards that can all be drawn at once. Use [ItemCard](ItemCard.md) instead.
- Records with columns the user sorts, groups or resizes. Use [DataTable](DataTable.md) instead.

## Rules

- Give it items, getKey and renderItem; getKey returns a stable id, never the position.
- Give label a name for the grid, since the tiles are drawn without a heading of their own.
- Size the grid from its parent: it fills the height of its box and scrolls inside it.
- Pick the tile with tileSize, the name of a size token such as size-96; the columns that fit the width of the box are worked out from it, and a raw pixel number is not accepted.
- Keep renderItem cheap and free of its own size; the tile cuts what does not fit, and the tile pads its content.
- Raise overscan for tiles that load slowly while the user scrolls fast; the default is 2 rows on each side.
- Use onActiveChange to follow the tile that holds focus, such as to show its detail beside the grid.

## Accessibility

- The grid is a grid of cells with the row and column of each, so a reader hears where the tile is among thousands.
- One tile is in the tab order; the four arrows move by a tile or a row, Home and End go to the start or end of the row, Ctrl with them goes to the first or last tile, and Page Up and Page Down move by a screen of rows.
- A tile that holds focus stays drawn when it scrolls out of view, so the keys keep working.
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
```

## Props

- `items`: `readonly T[]`.
- `getKey`: `(item: T, index: number) => string`.
- `renderItem`: `(item: T, index: number) => ReactNode`.
- `label`: `string`.
- `tileSize` (optional): `VirtualSize`. Default `'size-96'`.
- `overscan` (optional): `number`.
- `onActiveChange` (optional): `(index: number) => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-bg`, `--c-border`, `--c-focus`, `--c-hover`, `--radius-md`, `--size-96`, `--space-xs`, `--vg-row`, `--vg-rows`.
