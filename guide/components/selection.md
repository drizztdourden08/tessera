# selection

The picking rules of a collection as one hook: a click picks one, Ctrl toggles, Shift takes a range or a rectangle, Ctrl and A takes all, Space toggles and a typed letter jumps to a label.

A hook module: functions for a screen that owns its own markup, not a component.

Import from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { rectKeys, toggledKey, typeAheadIndex, useSelectionModel } from '@drizztdourden08/tessera';
```

The source is `src/composites/selection/index.ts`.

## Use it when

- An app draws its own list, grid or tree of items and the user picks one or many of them.
- A grid must take a rectangle of tiles between two clicks, and skip holes that cannot be picked.
- Several collections of one app, such as a table, a grid and a list, must pick by the same rules.

## Use something else when

- Records with columns, checkboxes and a select-all box already drawn for you. Use [DataTable](DataTable.md) instead.
- A long grid of tiles that already takes a selection prop. Use [VirtualGrid](VirtualGrid.md) instead.
- A long list or a strip of items that already takes a selection prop. Use [VirtualList](VirtualList.md) instead.
- The user picks by dragging a rectangle over items. Use `useMarqueeSelect` instead.

## Rules

- Pass order, the keys of the items in the order they are shown, and selected with onChange; the app keeps the set and the hook keeps only the anchor of the last click.
- Call click(key, event) from a click, passing the event; Ctrl or Cmd toggles, Shift extends from the anchor and Ctrl with Shift adds the range to what is picked.
- Pass onPick to hear a plain click on one item, such as to open it; a toggle or a range does not call it.
- Pass seed, a key, to start a Shift range from an item that is already current when nothing was clicked yet.
- On a grid pass cellOf(key), the row and column of a key; Shift then takes the rectangle between the anchor and the key instead of a line.
- Pass isHole(key) for items that cannot be picked; clicks, ranges, rectangles and select all skip them.
- Wire onKeyDown(event, key) on each item: Ctrl or Cmd with A picks all, Space toggles, Shift with Space extends, Escape clears and acts only when something is picked.
- The key handler acts only when the item itself has focus, so a field inside an item keeps its own keys.
- For type ahead pass labelOf(key) and onFocusKey(key); a typed letter calls onFocusKey with the next key whose label starts with the typed text, and the text resets after a short pause.
- For a Shift with arrow range, call step(from, to, keep) from your own focus move, where from is the key that held focus.
- Use allState, checkAll, selectAll and clear for a select-all box; checkAll toggles the shown keys, and selectAll picks every key that is not a hole.
- The helpers rangeBetween, rectKeys, toggledKey and typeAheadIndex are the same math without the hook.

## Accessibility

- Mark each picked item with aria-selected and give the collection aria-multiselectable, since the hook sets no attribute.
- Every choice by pointer has a key: Space, Ctrl and A, Shift with Space or with the arrows, and Escape.
- Type ahead moves focus to the match, so a reader hears the item it lands on.

## Example

```tsx
import { useState } from 'react';
import { Box, useSelectionModel } from '@drizztdourden08/tessera';

const Names = ({ names }: { names: string[] }) => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const model = useSelectionModel({ order: names, selected: picked, onChange: setPicked });
  return (
    <Box role="listbox" aria-multiselectable="true" aria-label="Names">
      {names.map((name) => (
        <Box
          key={name}
          role="option"
          tabIndex={0}
          aria-selected={model.isSelected(name)}
          onClick={(event) => model.click(name, event)}
          onKeyDown={(event) => model.onKeyDown(event, name)}
        >
          {name}
        </Box>
      ))}
    </Box>
  );
};
```

## What it exports

- `rectKeys`, a function: `(order: readonly string[], cellOf: (key: string) => SelectionCell | undefined, from: string, to: string) => string[]`.
- `toggledKey`, a function: `(keys: ReadonlySet<string>, key: string) => Set<string>`.
- `typeAheadIndex`, a function: `(input: TypeAheadInput) => number`.
- `useSelectionModel`, a hook: `(input: SelectionModelInput) => SelectionModel`.

## Types

```ts
type SelectAllState = 'none' | 'some' | 'all';

interface SelectionCell {
  row: number;
  column: number;
}

interface SelectionClick {
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

interface SelectionModel {
  allState: SelectAllState;
  isSelected: (key: string) => boolean;
  click: (key: string, event: SelectionClick) => void;
  toggle: (key: string) => void;
  extend: (key: string, keep: boolean) => void;
  step: (from: string, to: string, keep: boolean) => void;
  checkAll: () => void;
  selectAll: () => void;
  clear: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>, key: string) => void;
}

interface SelectionModelInput {
  order: readonly string[];
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
  onPick?: (key: string) => void;
  seed?: string | null;
  cellOf?: (key: string) => SelectionCell | undefined;
  isHole?: (key: string) => boolean;
  labelOf?: (key: string) => string;
  onFocusKey?: (key: string) => void;
}
```
