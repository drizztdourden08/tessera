# ViewControls

Filter, group and sort controls in one row, behind a button that shows or hides them.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ViewControls } from '@drizztdourden08/tessera';
```

The source is `src/composites/ViewControls/ViewControls.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? Data. What data are you showing? Filters over a collection.

ViewControls keeps filter, group and sort in one row with one show button, so every collection view folds its controls the same way.

## Use it when

- A list, board or table offers any of a filter, a group and a sort, and the controls should be able to fold away.
- Different screens need different parts: each part shows only when its config is passed.

## Use something else when

- The screen only needs a search box and filter chips, always visible. Use `FilterBar` instead.
- The screen only needs a grouping menu. Use [GroupControl](GroupControl.md) instead.
- The screen only needs a sort menu. Use [SortControl](SortControl.md) instead.

## Rules

- Pass filter, group and sort with the props of FilterBar, GroupControl and SortControl; leave out a part to hide it.
- Control the row with open and onOpenChange, or leave both out and set defaultOpen; the row starts open.
- Folded, the button shows a count of the search, enabled filters, grouping and sort that are on.
- Set label to rename the button.

## Accessibility

- The button reports aria-expanded and is named Show view controls or Hide view controls.
- The count is a badge named by its number, such as 3 active settings.

## Example

```tsx
import { useState } from 'react';
import { ViewControls } from '@drizztdourden08/tessera';
import type { SortState } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
];

const PlayerControls = () => {
  const [search, setSearch] = useState('');
  const [grouping, setGrouping] = useState<string | null>(null);
  const [sort, setSort] = useState<SortState>({ key: 'name', direction: 'asc' });
  return (
    <ViewControls
      filter={{ search, onSearchChange: setSearch }}
      group={{ options: FIELDS, value: grouping, onChange: setGrouping }}
      sort={{ options: FIELDS, value: sort, onChange: setSort }}
    />
  );
};
```

## Props

- `filter` (optional): `FilterBarProps`.
- `group` (optional): `GroupControlProps`.
- `sort` (optional): `SortControlProps`.
- `open` (optional): `boolean`.
- `defaultOpen` (optional): `boolean`. Default `true`.
- `onOpenChange` (optional): `(open: boolean) => void`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--control-h-sm`, `--size-224`, `--space-sm`, `--space-xs`.
