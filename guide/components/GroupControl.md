# GroupControl

A menu that picks the one field a list is grouped by, or no grouping.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { GroupControl } from '@drizztdourden08/tessera';
```

The source is `src/composites/GroupControl/GroupControl.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? Data. What data are you showing? A menu to group a collection by one field.

GroupControl offers one grouping field at a time, with None to turn grouping off, drawn like the other view controls.

## Use it when

- A list or board can be split into sections by one of a few fields, such as status or owner.
- The choice sits in a toolbar beside a filter and a sort.

## Use something else when

- The list needs a filter, a group and a sort together behind one show button. Use [ViewControls](ViewControls.md) instead.
- The user picks the field to order rows by. Use [SortControl](SortControl.md) instead.
- The user narrows rows by a value. Use `FilterBar` instead.

## Rules

- Pass options as id and label pairs and keep the chosen id in your state; null means no grouping.
- Change the grouping only in onChange; the control keeps no value of its own.
- Set label to rename the menu title when the list calls its sections something else.

## Accessibility

- The trigger is a button that opens a keyboard menu named by label.
- The options are radio items, and the checked one is the current grouping.

## Example

```tsx
import { useState } from 'react';
import { GroupControl } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'status', label: 'Status' },
  { id: 'owner', label: 'Owner' },
];

const GroupPicker = () => {
  const [grouping, setGrouping] = useState<string | null>(null);
  return <GroupControl options={FIELDS} value={grouping} onChange={setGrouping} />;
};
```

## Props

- `options`: `readonly ViewOption[]`.
- `value`: `string | null`.
- `onChange`: `(next: string | null) => void`.
- `label` (optional): `string`.
- `className` (optional): `string`.
