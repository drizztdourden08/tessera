# DragGhost

The picture that follows the pointer while items are dragged: a stack of up to three thumbnails and the count of items.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DragGhost } from '@drizztdourden08/tessera';
```

The source is `src/composites/DragGhost/DragGhost.tsx`. Its gallery page is Composites · Data views/DragGhost (`#/story/composites-dragghost--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- The user drags one or many items of a grid, a table or a tree and needs to see how many go with the pointer.
- The items have thumbnails, such as sprites or images, that tell what is being moved.

## Use something else when

- The user drags a rectangle over items to pick them. Use [MarqueeBox](MarqueeBox.md) instead.
- The user drags tiles in a long grid that already draws its own ghost. Use [VirtualGrid](VirtualGrid.md) instead.

## Rules

- Pass count, the number of items dragged, and thumbnails, a list of nodes; at most three are stacked, newest on top, and never more than count.
- Pass point, the pointer in client pixels, to follow the pointer in a layer above the page; the point of useReorderDrag fits.
- Pass point null while nobody drags and nothing is drawn; leave point out to draw the ghost in place, such as in a story.
- For a native drag and drop, where the browser draws its own image, call useNativeDragGhost() and pass onDragStart(event, { count, thumbnails }) from the onDragStart of the dragged element; it draws the ghost off screen and hands it to setDragImage.
- UseNativeDragGhost draws the ghost in a root of its own, so the thumbnails see the theme but not the providers of the dragged element; keep them plain.
- It takes no pointer events, so the drop target below keeps its hover.
- Keep each thumbnail small and free of its own size; the card cuts what does not fit.

## Accessibility

- The ghost is decoration and hidden from readers; announce the move in a live region when it ends.
- Dragging is not the only way to move: give the items a key move for the same result.

## Example

```tsx
import { DragGhost, useReorderDrag } from '@drizztdourden08/tessera';
import { useRef } from 'react';

const Pile = ({ names }: { names: string[] }) => {
  const listRef = useRef<HTMLElement>(null);
  const drag = useReorderDrag({
    listRef,
    selector: '[data-reorder-index]',
    keys: () => names,
    onDrop: () => undefined,
  });
  return <DragGhost count={drag.dragKeys.length} thumbnails={names} point={drag.point} />;
};
```

## Props

- `count`: `number`.
- `thumbnails` (optional): `readonly ReactNode[]`. Default `[]`.
- `point` (optional): `DragGhostPoint | null`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-surface`, `--radius-sm`, `--shadow-overlay`, `--size-256`, `--size-64`, `--space-md`, `--space-sm`, `--space-xs`.

## Also exported from this folder

`useNativeDragGhost`.
