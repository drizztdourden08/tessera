# Tile

One square tile of a grid: a picture or any media, a name line under it and up to four marks in its corners, with a selected and a focused look.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Tile } from '@drizztdourden08/tessera';
```

The source is `src/composites/Tile/Tile.tsx`. Its gallery page is Composites · Data views/Tile (`#/story/composites-tile--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? One item as a tile with a picture, a name and corner marks.

Tile gives every grid of thumbnails the same square media, name line and four corner marks.

## Use it when

- A browser shows files, sprites or assets as thumbnails in a grid, with a name under each and small marks for their state.
- A tile in a VirtualGrid needs a selected look and a focus look that stay apart.

## Use something else when

- A catalogue item with a title, tags, details and actions. Use [ItemCard](ItemCard.md) instead.
- One seat of a lobby: taken, open or to add. Use [SeatCard](SeatCard.md) instead.
- One row of a list, with columns and actions. Use `ListItemRow` instead.

## Rules

- Media is the picture or any node, such as an Image with fit contain. It fills a square and never changes the size of the tile.
- Name is the one line under the media; a long name is cut with an ellipsis and a plain string is also the title.
- Corners takes topStart, topEnd, bottomStart and bottomEnd. Put a Badge, a Tag, an Icon or any small node in a corner; leave the rest out.
- The tile does not select itself. Pass selected and focused from the grid, and pass role, tabIndex and the handlers the grid gives you.
- With a role, selected is also reported as aria-selected. focused draws the focus ring for a tile the grid marks with aria-activedescendant.
- The tile fills its cell, so the grid sets its width: a slider can drive the tile size of a VirtualGrid, and a very small size can switch the grid to a list.

## Accessibility

- The tile is plain content: the grid gives it a role such as option or gridcell and its tab stop.
- A corner mark that carries meaning needs its own label, since the corner is not read as text.
- The name is the text of the tile; give media an empty alt unless it says something the name does not.

## Example

```tsx
import { Badge, Image, Tile } from '@drizztdourden08/tessera';

interface SpriteTileProps {
  name: string;
  src: string;
  picked: boolean;
  frames: number;
}

const SpriteTile = ({ name, src, picked, frames }: SpriteTileProps) => (
  <Tile
    name={name}
    selected={picked}
    media={<Image src={src} alt="" fit="integer" backdrop="checker" pixelated />}
    corners={{ bottomEnd: <Badge variant="inline" value={frames} label="Frame count" /> }}
  />
);
```

## Props

- `media`: `ReactNode`.
- `name` (optional): `ReactNode`.
- `corners` (optional): `TileCorners`.
- `selected` (optional): `boolean`. Default `false`.
- `focused` (optional): `boolean`. Default `false`.

It also takes the 277 attributes it inherits through `Omit<HTMLAttributes<HTMLDivElement>, 'children'>`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-soft`, `--c-sunken`, `--c-text`, `--radius-md`, `--radius-sm`, `--space-2xs`, `--space-xs`, `--text-sm`.
