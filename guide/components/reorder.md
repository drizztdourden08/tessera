# reorder

Drag and keyboard reorder for a list or grid the app owns, as functions you wire into your own markup.

A hook module: functions for a screen that owns its own markup, not a component.

Import from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { columnsOf, REORDER_ITEM_SELECTOR, reorderStep, useMoveFocus, useReorderDrag } from '@drizztdourden08/tessera';
```

The source is `src/composites/reorder/index.ts`.

## Use it when

- An app builds its own reorderable list, such as a layers panel, and the rows are its own markup.
- An app builds its own grid of items the user puts in order, such as a palette grid, and needs the arrow keys to move an item by a row or a column.
- The same list must reorder by pointer drag and by keys, and keep focus on the moved item.

## Use something else when

- The list is a strip of open documents with close buttons and an unsaved mark. Use [DocumentTabs](DocumentTabs.md) instead.
- The list is a short set of rows the user edits in place, one input per column. Use [RowGrid](RowGrid.md) instead.

## Rules

- Give each item data-reorder-index with its position and data-reorder-key with a stable id, as direct children of the list element, and pass the list as listRef.
- Pass REORDER_ITEM_SELECTOR as the selector of useReorderDrag, and spread handlers(index) on the control the user grabs, not on the whole item.
- Set axis to horizontal, vertical or grid to match the layout; onDrop gets the old and the new position and the app moves the item.
- Move by keys with reorderStep: pass the key event, the axis, the chord (alt or plain), the index and the total; it returns the new position, or undefined for any other key.
- For a grid, pass columns from columnsOf(list, REORDER_ITEM_SELECTOR) so up and down move by a row.
- Call expect(id) of useMoveFocus before the move so focus follows the item, and announce a sentence such as Layer moved to 3 of 8 in a live region that shows its message.
- Draw the drop mark and the dragging state from dropMark(index, total) and dragging; the hook sets no style.

## Accessibility

- Keys move an item without a pointer: use the alt chord when plain arrows already move focus, and the plain chord when they do not.
- The message of useMoveFocus is the announcement; render it in a polite live region, since a move changes no focus text on its own.
- Focus lands on the first button of the moved item that is outside a data-reorder-toggles group, so the user keeps their place.

## Example

```tsx
import { useRef } from 'react';
import { Box, Pressable, REORDER_ITEM_SELECTOR, reorderStep, useMoveFocus, useReorderDrag } from '@drizztdourden08/tessera';

type Layer = { id: string; name: string };

const LayerList = ({ layers, onMove }: { layers: Layer[]; onMove: (from: number, to: number) => void }) => {
  const listRef = useRef<HTMLElement>(null);
  const focus = useMoveFocus(listRef);
  const commit = (from: number, to: number) => {
    focus.announce(`${layers[from]?.name} moved to ${to + 1} of ${layers.length}`);
    onMove(from, to);
  };
  const drag = useReorderDrag({ listRef, selector: REORDER_ITEM_SELECTOR, axis: 'vertical', onDrop: commit });
  return (
    <>
      <Box ref={listRef} role="list">
        {layers.map((layer, index) => (
          <Box key={layer.id} role="listitem" data-reorder-index={index} data-reorder-key={layer.id} data-drop={drag.dropMark(index, layers.length)}>
            <Pressable
              {...drag.handlers(index)}
              onKeyDown={(event) => {
                const to = reorderStep(event, { axis: 'vertical', chord: 'alt', index, total: layers.length });
                if (to === undefined) return;
                event.preventDefault();
                focus.expect(layer.id);
                commit(index, to);
              }}
            >
              {layer.name}
            </Pressable>
          </Box>
        ))}
      </Box>
      <Box aria-live="polite">{focus.message}</Box>
    </>
  );
};
```

## What it exports

- `columnsOf`, a function: `(list: HTMLElement | null, selector: string) => number`.
- `REORDER_ITEM_SELECTOR`, a constant: `":scope > [data-reorder-index]"`.
- `reorderStep`, a function: `(event: ReorderKeyEvent, options: ReorderStepOptions) => number | undefined`.
- `useMoveFocus`, a hook: `(listRef: RefObject<HTMLElement | null>) => MoveFocus`.
- `useReorderDrag`, a hook: `({ listRef, selector, axis, onDrop }: ReorderDragOptions) => ReorderDrag`.

## Types

```ts
interface MoveFocus {
  message: string;
  announce: (message: string) => void;
  expect: (id: string) => void;
}

type ReorderAxis = 'vertical' | 'horizontal' | 'grid';

interface ReorderDrag {
  dragging: number | null;
  handlers: (index: number) => ReorderHandlers;
  cancel: () => void;
  dropMark: (index: number, total: number) => ReorderDrop | undefined;
}

interface ReorderDragOptions {
  listRef: RefObject<HTMLElement | null>;
  selector: string;
  axis?: ReorderAxis;
  onDrop: (from: number, to: number) => void;
}

type ReorderDrop = 'before' | 'after';

interface ReorderKeyEvent {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

interface ReorderStepOptions {
  axis: ReorderAxis;
  chord: ReorderChord;
  index: number;
  total: number;
  columns?: number;
}
```
