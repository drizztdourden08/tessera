# marquee

Drag a rectangle over an area to pick the items inside it, as in a file manager, with Shift to add, Ctrl or Cmd to toggle and Escape to cancel.

A hook module: functions for a screen that owns its own markup, not a component.

Import from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { cellRectOf, edgeScrollDelta, hitItems, hitKeys, MARQUEE_KEY_ATTRIBUTE, marqueeItemRects, mergeSelection, modifiersOf, rectFromPoints, rectsIntersect, useMarqueeSelect } from '@drizztdourden08/tessera';
```

The source is `src/composites/marquee/index.ts`.

## Use it when

- An app draws a grid of tiles, files or marks and the user picks many by dragging over them.
- The area scrolls and the drag must keep going when the pointer reaches its edge.

## Use something else when

- The rectangle itself must be drawn. Use [MarqueeBox](MarqueeBox.md) instead.
- The user picks rows of a table. Use [DataTable](DataTable.md) instead.

## Rules

- Pass the containerRef of the box that scrolls, the selected keys and onChange; the app keeps the selection.
- Spread bind on that box and draw rect with MarqueeBox inside it; rect is null when nobody drags.
- Mark each item with data-marquee-key and pass its selector as itemSelector, or pass getRects with rects in the content space of the box.
- A drag that starts on an item does nothing by default; pass canStart to change where a drag may start.
- The drag starts after the pointer moves 4 pixels; pass threshold to change it, and enabled false to turn it off.
- Shift adds to the selection, Ctrl or Cmd toggles the items inside, and Escape puts the selection back as it was.
- Set touch-action none on the box when touch must drag, and pass autoScroll false to stop the scroll near its edges.
- Give an item of getRects a cell, its row and column, and the hook returns cells, the first and last row and column of the items inside the rectangle, or null when nobody drags; a grid can show the span or select that block.
- The functions rectFromPoints, rectsIntersect, hitKeys, hitItems, cellRectOf, mergeSelection and edgeScrollDelta are the same math without the hook.

## Accessibility

- Dragging is for pointers only; give the items keys or checkboxes for the same choice.
- Escape cancels a drag and restores the earlier selection.
- The picked items must show their own selected state, since the rectangle is hidden from readers.

## Example

```tsx
import { useRef, useState } from 'react';
import { Box, MarqueeBox, useMarqueeSelect } from '@drizztdourden08/tessera';

const Tiles = ({ ids }: { ids: string[] }) => {
  const areaRef = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const marquee = useMarqueeSelect({ containerRef: areaRef, itemSelector: '[data-marquee-key]', selected: picked, onChange: setPicked });
  return (
    <Box ref={areaRef} {...marquee.bind}>
      {ids.map((id) => (
        <Box key={id} data-marquee-key={id} aria-selected={picked.includes(id)}>{id}</Box>
      ))}
      <MarqueeBox rect={marquee.rect} />
    </Box>
  );
};
```

## What it exports

- `cellRectOf`, a function: `(hits: readonly MarqueeItem[]) => MarqueeCellRect | null`.
- `edgeScrollDelta`, a function: `(pointer: Point, bounds: Rect, edge: number, speed: number) => Point`.
- `hitItems`, a function: `(area: Rect, items: readonly MarqueeItem[]) => readonly MarqueeItem[]`.
- `hitKeys`, a function: `(area: Rect, items: readonly MarqueeItem[]) => readonly string[]`.
- `MARQUEE_KEY_ATTRIBUTE`, a constant: `"data-marquee-key"`.
- `marqueeItemRects`, a function: `(container: HTMLElement, selector: string) => readonly MarqueeItem[]`.
- `mergeSelection`, a function: `(base: readonly string[], hits: readonly string[], modifiers: MarqueeModifiers) => readonly string[]`.
- `modifiersOf`, a function: `(keys: ModifierKeys) => MarqueeModifiers`.
- `rectFromPoints`, a function: `(a: Point, b: Point) => Rect`.
- `rectsIntersect`, a function: `(a: Rect, b: Rect) => boolean`.
- `useMarqueeSelect`, a hook: `(options: MarqueeOptions) => MarqueeSelect`.

## Types

```ts
interface MarqueeBind {
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
}

interface MarqueeCell {
  row: number;
  column: number;
}

interface MarqueeCellRect {
  firstRow: number;
  lastRow: number;
  firstColumn: number;
  lastColumn: number;
}

interface MarqueeItem {
  key: string;
  rect: Rect;
  cell?: MarqueeCell;
}

interface MarqueeModifiers {
  add: boolean;
  toggle: boolean;
}

interface MarqueeOptions {
  containerRef: RefObject<HTMLElement | null>;
  selected: readonly string[];
  onChange: (keys: readonly string[]) => void;
  itemSelector?: string;
  getRects?: () => readonly MarqueeItem[];
  canStart?: (event: ReactPointerEvent<HTMLElement>) => boolean;
  enabled?: boolean;
  threshold?: number;
  autoScroll?: boolean;
}

interface MarqueeSelect {
  rect: Rect | null;
  cells: MarqueeCellRect | null;
  bind: MarqueeBind;
}
```
