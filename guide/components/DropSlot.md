# DropSlot

A dashed container that takes one dragged card: it shows a label when empty, holds one node when filled, and clears on a button.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DropSlot } from '@drizztdourden08/tessera';
```

The source is `src/composites/DropSlot/DropSlot.tsx`. Its gallery page is Composites · Data views/DropSlot (`#/story/composites-dropslot--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- The user fills a named place by dragging a card onto it, such as the two ends of a transfer.
- The same place can also be filled by a pick, so a keyboard or a click opens a menu instead of a drag.

## Use something else when

- The user reorders items of a list by dragging. Use [DragGhost](DragGhost.md) instead.
- The user picks one value from a fixed list with no dragging. Use [Select](Select.md) instead.

## Rules

- Pass label, the name of the slot; it is shown while empty and read by assistive tech as the name of the group.
- Pass children, the filled node, or filled to say the slot is full without children; leave both out for the empty state.
- OnDrop receives the payload of the drag, the string of dataTransfer.getData(accept), and the drop event; the slot does not change itself, the parent keeps the state and passes children.
- Accept is a data type such as application/x-account; only drags that carry it highlight the slot and drop; leave it out to take text/plain.
- The source sets the payload in its onDragStart with event.dataTransfer.setData(type, value); it works with useNativeDragGhost and with plain HTML drag and drop.
- OnClear shows a clear button on a filled slot; clearLabel names it.
- OnPick is called on a click and on Enter, empty or filled, so a menu can choose instead of a drag.
- Size is sm, md or lg and sets the square the slot fills.

## Accessibility

- The slot is a focusable group named by label; Enter calls onPick.
- Dragging is not the only way to fill it: always give onPick a way to choose.
- Announce the new content in a live region when a drop fills the slot.

## Example

```tsx
import { DropSlot } from '@drizztdourden08/tessera';
import { useState } from 'react';

const Source = () => {
  const [account, setAccount] = useState<string | undefined>();
  return (
    <DropSlot
      label="From"
      accept="application/x-account"
      onDrop={setAccount}
      onClear={() => setAccount(undefined)}
      onPick={() => undefined}
    >
      {account}
    </DropSlot>
  );
};
```

## Props

- `label`: `string`.
- `children` (optional): `ReactNode`.
- `filled` (optional): `boolean`.
- `size` (optional): `DropSlotSize`, one of `'sm'`, `'md'`, `'lg'`. Default `'md'`.
- `accept` (optional): `string`.
- `clearLabel` (optional): `string`. Default `DEFAULT_CLEAR_LABEL`.
- `disabled` (optional): `boolean`.
- `onDrop` (optional): `(payload: string, event: DragEvent<HTMLElement>) => void`.
- `onClear` (optional): `() => void`.
- `onPick` (optional): `() => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-soft`, `--c-surface`, `--opacity-disabled`, `--radius-md`, `--size-128`, `--size-64`, `--size-96`, `--space-sm`, `--space-xs`, `--transition-fast`.
