# ReorderList

A list of named items the user puts in order by drag or by keys, with a row of on and off icons on each item, such as the layers of a drawing.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ReorderList } from '@drizztdourden08/tessera';
```

The source is `src/composites/ReorderList/ReorderList.tsx`. Its gallery page is Composites · Lists/ReorderList (`#/story/composites-reorderlist--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A list the user reorders, with on and off icons on each row.

ReorderList is an ordered list the user reorders by drag or keys, with on and off icons on each row, the same way in every app.

## Use it when

- The order of the items matters and the user changes it, such as layers, tracks or steps.
- Each item has a few on and off states the user flips from the row, such as visible and locked.
- One item at a time is selected, and the app acts on it.

## Use something else when

- Each row has inputs to edit, and the list is added to and removed from. Use [RowGrid](RowGrid.md) instead.
- The rows are read only, or the user does not change their order. Use `ListItemRow` instead.
- The user adds, renames and deletes the items of a list beside an editor. Use [ItemList](ItemList.md) instead.

## Rules

- Keep the items in the app and change them in onMove; the list only draws them.
- Describe the toggles once, in toggles: an id, a label and an icon for on and one for off.
- Keep the state of each toggle on its item, in toggles keyed by the toggle id, and flip it in onToggle.
- A toggle with no state reads as off.
- Name each toggle by what it is when it is on, such as Visible or Locked.
- Pass selectedId for the item the app has open; the app keeps it and changes it in onSelect.

## Accessibility

- The list is named by label, and each row is one button that selects the item and carries aria-pressed when selected.
- Up and Down move focus from row to row, and Home and End go to the first and the last. Only one row is a tab stop.
- Alt and Up or Down moves the focused row. Focus stays on the row, and the move is announced.
- Space or Enter selects the row.
- Each toggle is an icon button named by its label, with aria-pressed set to its state, in a group named after the item.
- The drop line follows the pointer while a row is dragged, and the list adds no motion when the user asks for less.

## Example

```tsx
import { ReorderList } from '@drizztdourden08/tessera';
import type { ReorderItem, ReorderToggle } from '@drizztdourden08/tessera';

const TOGGLES: ReorderToggle[] = [
  { id: 'visible', label: 'Visible', iconOn: 'eye', iconOff: 'eye-off' },
  { id: 'locked', label: 'Locked', iconOn: 'lock', iconOff: 'lock-open' },
];

interface LayersProps {
  layers: ReorderItem[];
  selectedId: string;
  select: (id: string) => void;
  move: (from: number, to: number) => void;
  toggle: (layerId: string, toggleId: string, next: boolean) => void;
}

const Layers = ({ layers, selectedId, select, move, toggle }: LayersProps) => (
  <ReorderList
    label="Layers"
    items={layers}
    toggles={TOGGLES}
    selectedId={selectedId}
    onSelect={select}
    onMove={move}
    onToggle={toggle}
  />
);
```

## Props

- `label`: `string`.
- `items`: `readonly ReorderItem[]`.
- `toggles` (optional): `readonly ReorderToggle[]`. Default `[]`.
- `selectedId` (optional): `string`.
- `onSelect` (optional): `(id: string) => void`.
- `onMove`: `(from: number, to: number) => void`.
- `onToggle` (optional): `(itemId: string, toggleId: string, next: boolean) => void`.
- `empty` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-primary-bright`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--opacity-muted`, `--size-1`, `--size-24`, `--space-2xs`, `--space-xl`, `--transition-fast`.
