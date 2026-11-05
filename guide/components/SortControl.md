# SortControl

A menu that picks the field a list is sorted by, with one button that flips the direction.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SortControl } from '@drizztdourden08/tessera';
```

The source is `src/composites/SortControl/SortControl.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? Data. What data are you showing? A menu to sort a collection by one field and a direction.

SortControl pairs a field menu with one direction button, drawn like the other view controls.

## Use it when

- A list or board can be ordered by one of a few fields, such as name or date.
- The choice sits in a toolbar beside a filter and a group.

## Use something else when

- The list needs a filter, a group and a sort together behind one show button. Use [ViewControls](ViewControls.md) instead.
- The user sorts by clicking a column header in a table. Use [DataTable](DataTable.md) instead.
- The user splits the list into sections. Use [GroupControl](GroupControl.md) instead.

## Rules

- Pass options as id and label pairs and keep the value, a key and a direction, in your state.
- A null key means the default order; the direction button still flips the direction.
- Change the sort only in onChange; the control keeps no value of its own.

## Accessibility

- The trigger is a button that opens a keyboard menu; its options are radio items.
- The direction button is named by the sort it switches to, such as Sort descending.

## Example

```tsx
import { useState } from 'react';
import { SortControl } from '@drizztdourden08/tessera';
import type { SortState } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'name', label: 'Name' },
  { id: 'updated', label: 'Updated' },
];

const SortPicker = () => {
  const [sort, setSort] = useState<SortState>({ key: 'name', direction: 'asc' });
  return <SortControl options={FIELDS} value={sort} onChange={setSort} />;
};
```

## Props

- `options`: `readonly ViewOption[]`.
- `value`: `SortState`.
- `onChange`: `(next: SortState) => void`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--control-h-sm`, `--size-224`, `--space-sm`, `--space-xs`.
