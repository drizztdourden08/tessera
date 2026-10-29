# SeatGrid

The grid that lays seat cards side by side and wraps them to the width, with the same gap and the same smallest width for every seat.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SeatGrid } from '@drizztdourden08/tessera';
```

The source is `src/composites/SeatGrid/SeatGrid.tsx`. Its gallery page is Composites · Content/SeatGrid (`#/story/composites-seatgrid--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? The seats of a lobby, taken, open or to add.

SeatGrid gives every lobby the same wrapping grid of seats, with the sizes set by tokens.

## Use it when

- A lobby shows its seats as cards that should fill the row and wrap to the next one on a narrow screen.
- Taken, open and add seats sit in one grid and must line up at the same size.

## Use something else when

- Cards of any kind laid out on columns or a smallest width in pixels. Use [Grid](Grid.md) instead.
- A long grid of equal tiles drawn only where it is in view. Use [VirtualGrid](VirtualGrid.md) instead.

## Rules

- Put SeatCard children in it; the columns are as many as fit at minWidth, and they share the free width.
- Pick minWidth sm, md or lg for the smallest a seat gets; md is the default.
- Pick gap xs, sm, md or lg for the space between seats; md is the default.
- Pass label to name the grid, such as Agents of the project.

## Accessibility

- The grid is a group named by label, so the seats are heard as one set.
- The order of the children is the reading and the tab order; put the add seat last.

## Example

```tsx
import { SeatCard, SeatGrid } from '@drizztdourden08/tessera';

const Table = ({ addSeat }: { addSeat: () => void }) => (
  <SeatGrid label="Seats at the table" minWidth="lg" gap="lg">
    <SeatCard state="filled" name="Ada" meta="Host" />
    <SeatCard state="empty" label="Seat 2" />
    <SeatCard state="add" label="Add a seat" onSelect={addSeat} />
  </SeatGrid>
);
```

## Props

- `children`: `ReactNode`.
- `label` (optional): `string`.
- `minWidth` (optional): `SeatGridMinWidth`, one of `'sm'`, `'md'`, `'lg'`. Default `'md'`.
- `gap` (optional): `SeatGridGap`, one of `'xs'`, `'sm'`, `'md'`, `'lg'`. Default `'md'`.
- `className` (optional): `string`.

## Tokens

It draws on `--size-160`, `--size-224`, `--size-288`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`.
