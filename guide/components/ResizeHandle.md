# ResizeHandle

The one thin line between two panels that the user drags, or moves with the keys, to resize the panel beside it, and that folds the panel when pulled past the end of its range.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ResizeHandle } from '@drizztdourden08/tessera';
```

The source is `src/composites/ResizeHandle/ResizeHandle.tsx`. Its gallery page is Composites · Layout/ResizeHandle (`#/story/composites-resizehandle--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A side panel the user drags wider.

ResizeHandle is the one resize line of every Tessera layout: drag, keys, value, range and drag to fold, with usePaneSize to keep a width in pixels.

## Use it when

- A side panel keeps its own width in pixels and the user drags its edge to change it, such as an outline or an inspector.
- A part draws its own panes and needs the one resize line every Tessera layout draws.

## Use something else when

- Two panes share the room by ratio and one can fold behind a rail. Use `SplitPane` instead.
- A list sits beside the detail of the picked item. Use [ListDetailLayout](ListDetailLayout.md) instead.
- The user moves panels around and docks them. Use `DockLayout` instead.

## Rules

- Pair it with usePaneSize and spread its handle: the hook keeps the size, its limits and storageKey, and the handle wires the line.
- Size the panel from usePaneSize size, as an inline width: the line moves nothing by itself.
- For a side panel, a list beside its detail or two panes, draw the edge with SidePanel, ListDetailLayout or SplitPane: they put the fold button beside this line for you.
- Pass edge="end" for a panel after the line, such as an inspector on the right, so dragging toward it shrinks it.
- Pass orientation="vertical" for panes stacked one above the other; the line then lies across and moves up and down.
- It draws one line, a thin --c-border-strong that brightens a little to --c-text-muted on hover, focus and drag; there is no other look.
- Pass fold when the panel can fold: { sides, folded, onFold, onUnfold }. A drag past the end of the range by about 32 px, or an arrow key at the end, calls onFold; dragging out from a folded panel, or the opposite arrow key, calls onUnfold with the value to open at.
- Enter folds an open panel and opens a folded one, and onReset still runs on Space and a double click.

## Accessibility

- It is a focusable separator with aria-valuenow, aria-valuemin and aria-valuemax; name the panel in label, such as Resize outline.
- Pass controls with the id of the panel it resizes, for aria-controls.
- The arrow keys move it by step, Shift by largeStep, and Home and End jump to the limits; at the end of the range an arrow key folds the panel when fold allows it.
- While a panel is folded the value reads as zero, and the minimum reads as zero when the panel can fold.

## Example

```tsx
import { Box, ResizeHandle, usePaneSize } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const EditorRails = ({ outline, canvas, inspector }: { outline: ReactNode; canvas: ReactNode; inspector: ReactNode }) => {
  const outlineSize = usePaneSize({ initial: 224, min: 160, max: 360, storageKey: 'hud.outline' });
  const inspectorSize = usePaneSize({ initial: 256, min: 192, max: 400, storageKey: 'hud.inspector' });
  return (
    <Box className="hud-editor">
      <Box as="aside" id="hud-outline" style={{ inlineSize: outlineSize.size }}>{outline}</Box>
      <ResizeHandle label="Resize outline" controls="hud-outline" {...outlineSize.handle} />
      <Box as="main" className="hud-editor__canvas">{canvas}</Box>
      <ResizeHandle label="Resize inspector" controls="hud-inspector" edge="end" {...inspectorSize.handle} />
      <Box as="aside" id="hud-inspector" style={{ inlineSize: inspectorSize.size }}>{inspector}</Box>
    </Box>
  );
};
```

## Props

- `label`: `string`.
- `value` (optional): `number`.
- `min`: `number`.
- `max`: `number`.
- `onResize`: `(next: number, change: ResizeChange) => void`.
- `onResizeEnd` (optional): `(value: number) => void`.
- `onDragChange` (optional): `(dragging: boolean) => void`.
- `onReset` (optional): `() => void`.
- `fold` (optional): `HandleFold`.
- `measure` (optional): `() => number`.
- `pixelsPerUnit` (optional): `(handle: HTMLElement) => number`.
- `orientation` (optional): `SplitOrientation`, one of `'horizontal'`, `'vertical'`.
- `edge` (optional): `ResizeHandleEdge`, one of `'start'`, `'end'`.
- `step` (optional): `number`.
- `largeStep` (optional): `number`.
- `controls` (optional): `string`.
- `title` (optional): `string`.
- `className` (optional): `string`.
- `onDragOver` (optional): `(event: DragEvent<HTMLElement>) => void`.
- `onDrop` (optional): `(event: DragEvent<HTMLElement>) => void`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-focus`, `--c-text-muted`, `--duration-fast`, `--ease-standard`, `--space-2xl`, `--space-sm`.

## Also exported from this folder

`usePaneSize`.
