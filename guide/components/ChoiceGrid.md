# ChoiceGrid

A row or grid of any cells where the user picks one, as a radio group or a listbox, with one Tab stop, arrow keys and optional sections.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ChoiceGrid } from '@drizztdourden08/tessera';
```

The source is `src/composites/ChoiceGrid/ChoiceGrid.tsx`. Its gallery page is Composites · Inputs/ChoiceGrid (`#/story/composites-choicegrid--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A colour from a palette.

ChoiceGrid is the strip or grid of cells where one is picked; draw each cell as a ColorSwatch for a palette.

## Use it when

- The user picks one swatch, brush, pattern or tile from a strip or a grid, such as a palette row or a brush picker.
- The cells are your own content, drawn by renderCell, such as a ColorSwatch or an Image.
- A popover opens under a held press and the user picks by letting go over a cell: set pickOnRelease.

## Use something else when

- A few text options in one line, all in view. Use [SegmentedControl](SegmentedControl.md) instead.
- Many text options in a list, or found by typing. Use [Select](Select.md) instead.
- Several choices at once. Use [CheckList](CheckList.md) instead.
- A long grid of equal tiles drawn only where it is in view. Use [VirtualGrid](VirtualGrid.md) instead.

## Rules

- Pass label, value and onChange, and the cells or the sections. A section has an id, an optional label and its cells.
- Leave columns out for one row; pass columns for a grid with that many columns in each section.
- Role is radiogroup by default, and an arrow key picks as it moves. Pass listbox to move without picking; Enter and Space pick.
- Spread state.props from renderCell onto the cell you draw, such as a ColorSwatch with focusRing apart, so it keeps the role, the name and the Tab stop.
- PickOnRelease picks on the pointer up over a cell, even when the press started elsewhere, so a palette opened at a point picks by release.
- Footer takes an add button or a hint under the cells. A ramp strip is a ChoiceGrid of ColorSwatch cells.
- A brush or pattern picker is a Toolbar popover item whose render returns a ChoiceGrid with columns. Draw each cell as an Image with fit integer and pixelated, or a small Svg grid, so the preview stays crisp, and put an Add from selection Button in footer.

## Accessibility

- The grid is one Tab stop; arrows move inside it, Home and End jump to the first and last cell, and Up and Down step by a row when columns is set.
- Each cell has the role radio or option, a name from its label, and its checked or selected state.
- A labelled section is a group named by its heading.

## Example

```tsx
import { ChoiceGrid, ColorSwatch } from '@drizztdourden08/tessera';

interface RampStripProps {
  ramp: readonly string[];
  index: number;
  onIndex: (index: number) => void;
}

const RampStrip = ({ ramp, index, onIndex }: RampStripProps) => (
  <ChoiceGrid
    label="Ramp"
    value={String(index)}
    onChange={(value) => onIndex(Number(value))}
    cells={ramp.map((hex, i) => ({ value: String(i), label: `Shade ${i + 1}, ${hex}` }))}
    renderCell={(cell, state) => (
      <ColorSwatch
        size="sm"
        color={ramp[Number(cell.value)] ?? '#000000'}
        caption={Number(cell.value) + 1}
        selected={state.selected}
        focusRing="apart"
        {...state.props}
      />
    )}
  />
);
```

## Props

- `label`: `string`.
- `value` (optional): `T | null`.
- `onChange`: `(value: T) => void`.
- `cells` (optional): `readonly ChoiceCell<T>[]`.
- `sections` (optional): `readonly ChoiceSection<T>[]`.
- `columns` (optional): `number`.
- `role` (optional): `ChoiceRole`, one of `'radiogroup'`, `'listbox'`. Default `'radiogroup'`.
- `pickOnRelease` (optional): `boolean`. Default `false`.
- `renderCell` (optional): `(cell: ChoiceCell<T>, state: ChoiceCellState) => ReactNode`.
- `footer` (optional): `ReactNode`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-primary`, `--c-surface`, `--c-text`, `--control-h-md`, `--font-mono`, `--opacity-disabled`, `--radius-sm`, `--space-2xs`, `--space-sm`, `--space-xs`, `--text-xs`, `--tracking-caps`.
