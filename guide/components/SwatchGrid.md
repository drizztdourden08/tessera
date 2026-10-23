# SwatchGrid

A grid of square colour swatches the user picks from, ranges over and puts in order, such as the palette of a pixel art editor.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SwatchGrid } from '@drizztdourden08/tessera';
```

The source is `src/composites/SwatchGrid/SwatchGrid.tsx`. Its gallery page is Composites · Inputs/SwatchGrid (`#/story/composites-swatchgrid--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A colour from a palette.

SwatchGrid is a grid of swatches the user picks one colour from, selects a range of and puts in order, the same way in every app.

## Use it when

- The user picks one colour out of a fixed set of swatches that wrap into rows.
- The order of the swatches matters, because it is an index the app uses, and the user changes it.
- Some slots are transparent, or the user selects a run of neighbours as a range.

## Use something else when

- The user makes any colour from fields, a spectrum or a hex value. Use `ColorPicker` instead.
- The colour sits behind one swatch that opens a picker. Use `ColorPickerPopover` instead.
- The items are named rows in one column, not squares. Use [ReorderList](ReorderList.md) instead.

## Rules

- Keep the colours in the app and change them in onMove; the grid only draws them.
- Give each colour an id that stays the same when it moves. A value of null is a transparent slot, drawn as a checkerboard.
- Pass selectedId for the primary colour, and change it in onSelect. The selected swatch is also the start of a range.
- Pass range as a from and a to index to draw a range, and keep it in onRangeChange. Clear it in onSelect.
- Pass secondaryId and onSecondarySelect for a second colour, such as the background. Ctrl or Cmd with a click picks it.
- Leave onMove out for a palette the user cannot reorder; the grid then drags and moves nothing.
- Delete is not handled. Listen for it in the app, on the grid or around it.
- Set columns for a fixed width, or leave it out and the grid fits as many swatches as the width holds. Put the grid in a scroll box for a long palette.
- ShowIndex turns the small 0-based index on each swatch on or off. It is on by default.

## Accessibility

- The grid is a listbox named by label, and each swatch is a button with the option role. A swatch is one choice from a flat set, and the wrapped rows are layout, so the grid role, which needs real row elements, does not fit.
- Each swatch is named by its label, or by its colour value, then its index, and by secondary when it is the second colour. A transparent slot is named Transparent.
- Aria-selected is true on the selected swatch and on each swatch in the range. The list is multiselectable only when onRangeChange is set.
- Only one swatch is a tab stop. The arrow keys move focus in two dimensions, Home and End go to the first and the last, and Space or Enter selects.
- Shift with an arrow, Home or End extends a range from the selected swatch, and Shift with a click does the same.
- Alt with an arrow moves the swatch, the same chord as ReorderList. Focus follows the swatch, and the move is announced.
- The drop line follows the pointer while a swatch is dragged, and the grid adds no motion when the user asks for less.

## Example

```tsx
import { SwatchGrid } from '@drizztdourden08/tessera';
import type { SwatchColor } from '@drizztdourden08/tessera';

interface PaletteProps {
  colors: SwatchColor[];
  selectedId: string;
  backgroundId: string;
  select: (id: string) => void;
  selectBackground: (id: string) => void;
  move: (from: number, to: number) => void;
}

const Palette = ({ colors, selectedId, backgroundId, select, selectBackground, move }: PaletteProps) => (
  <SwatchGrid
    label="Palette"
    colors={colors}
    selectedId={selectedId}
    secondaryId={backgroundId}
    onSelect={select}
    onSecondarySelect={selectBackground}
    onMove={move}
    columns={8}
  />
);
```

## Props

- `label`: `string`.
- `colors`: `readonly SwatchColor[]`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `columns` (optional): `number`.
- `showIndex` (optional): `boolean`. Default `true`.
- `selectedId` (optional): `string`.
- `secondaryId` (optional): `string`.
- `range` (optional): `SwatchRange`.
- `onSelect` (optional): `(id: string) => void`.
- `onSecondarySelect` (optional): `(id: string) => void`.
- `onRangeChange` (optional): `(from: number, to: number) => void`.
- `onMove` (optional): `(from: number, to: number) => void`.
- `empty` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-info`, `--c-primary-bright`, `--c-scrim`, `--c-secondary-bright`, `--control-h-md`, `--control-h-sm`, `--opacity-muted`, `--size-1`, `--size-2`, `--size-4`, `--size-6`, `--space-xl`.
