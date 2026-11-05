# GroupBar

A row of group by chips, each added from an Add group menu and removed with its x.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { GroupBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/GroupBar/GroupBar.tsx`. Its gallery page is Composites · Data views/GroupBar (`#/story/composites-groupbar--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Group by chips with an Add group menu, like a filter bar.

GroupBar lists the grouping levels as removable chips and adds one through a menu, drawn like the FilterBar chips.

## Use it when

- A list can be grouped by one or several fields and the choice sits beside a FilterBar.
- The grouping should read like the filter chips, with a plus button to add a level.

## Use something else when

- The list is grouped by one field chosen from a single menu. Use [GroupControl](GroupControl.md) instead.
- The user narrows rows by a value. Use `FilterBar` instead.
- The list needs a filter, a group and a sort together behind one show button. Use [ViewControls](ViewControls.md) instead.

## Rules

- Keep the ordered ids in your state; the first id is the outermost group. Change them only in onChange.
- Set maxLevels to cap the levels; at the cap, or when every option is used, the Add group button is not drawn.
- An id that is not in options draws no chip.

## Accessibility

- Each chip is a group named by its option, and its remove button is named Remove grouping by that option.
- The Add group button opens a keyboard menu of the options not yet used.

## Example

```tsx
import { useState } from 'react';
import { GroupBar } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'status', label: 'Status' },
  { id: 'owner', label: 'Owner' },
];

const Grouping = () => {
  const [levels, setLevels] = useState<string[]>([]);
  return <GroupBar options={FIELDS} value={levels} onChange={setLevels} maxLevels={2} />;
};
```

## Props

- `options`: `readonly ViewOption[]`.
- `value`: `readonly string[]`.
- `onChange`: `(next: string[]) => void`.
- `maxLevels` (optional): `number`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-primary-bright`, `--c-primary-text`, `--c-surface`, `--c-text`, `--c-text-muted`, `--control-h-sm`, `--control-pad-sm`, `--filter-clause-width`, `--font-mono`, `--radius-md`, `--shadow-dropdown`, `--size-160`, `--size-224`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--z-base`, `--z-sticky`.
