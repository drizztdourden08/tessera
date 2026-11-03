# SpanBar

A bar over a row of cells that the user drags to move, stretches from either end and moves with the keys, with a lane to draw a new one.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SpanBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/SpanBar/SpanBar.tsx`. Its gallery page is Composites · Inputs/SpanBar (`#/story/composites-spanbar--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A range.

SpanBar edits a range of cells on a row, where Slider edits a number between two limits.

## Use it when

- A range of cells is edited in place, such as the frames an animation clip covers.
- The cells are equal, or have different widths such as frames with different hold times.

## Use something else when

- The user picks one cell, not a range. Use [ScrubRuler](ScrubRuler.md) instead.
- The range is a number between two limits, with no row of cells behind it. Use `Slider` instead.

## Rules

- Pass the same cells to every bar and ruler of a row, so they line up for any cell widths.
- Keep start and end in the parent and write them back from onChange, which fires once when a drag ends.
- Use onDraft to follow a drag in progress, such as a preview; it gets null when the drag is cancelled.
- Wrap the bars in a SpanLane when the user may draw a new span, and add it from onCreate.
- Pass announce so the range is read after each key step, and label so the bar has a name.
- Set readOnly to keep the bar focusable and block every change.

## Accessibility

- The bar is a button with a name; Enter activates it.
- Alt + Shift + Left and Right move the end, and Alt + Ctrl + Left and Right move the whole span.
- Each key step is announced through announce, such as Cells 3 to 6.
- Escape cancels a drag, and the bar keeps a 24 pixel minimum size for touch.

## Example

```tsx
import { SpanBar, SpanLane } from '@drizztdourden08/tessera';
import type { CellGeometry, CellSpan } from '@drizztdourden08/tessera';

const ClipRow = ({ cells, span, setSpan }: { cells: CellGeometry; span: CellSpan; setSpan: (span: CellSpan) => void }) => (
  <SpanLane cells={cells} label="Frames">
    <SpanBar start={span.start} end={span.end} cells={cells} onChange={setSpan} label="Walk" colour="blue">
      Walk
    </SpanBar>
  </SpanLane>
);
```

## Props

- `start`: `number`.
- `end`: `number`.
- `cells`: `CellGeometry`.
- `count` (optional): `number`.
- `onChange` (optional): `(span: CellSpan) => void`.
- `onDraft` (optional): `(span: CellSpan | null) => void`.
- `label` (optional): `string`.
- `readOnly` (optional): `boolean`. Default `false`.
- `selected` (optional): `boolean`. Default `false`.
- `onSelect` (optional): `(event: MouseEvent<HTMLElement>) => void`.
- `onActivate` (optional): `() => void`.
- `announce` (optional): `(text: string) => void`.
- `snap` (optional): `SpanSnap`, one of `'cell'`, `'none'`. Default `'cell'`.
- `minLength` (optional): `number`. Default `SPAN_DEFAULT_MIN_LENGTH`.
- `colour` (optional): `TagCategoryColor`, one of `'rose'`, `'orange'`, `'amber'`, `'lime'`, `'green'`, `'teal'`, `'cyan'`, `'blue'`, `'violet'`, `'pink'`.
- `className` (optional): `string`.
- `children` (optional): `ReactNode`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-focus`, `--c-primary`, `--c-primary-soft`, `--c-text`, `--hue-fill`, `--hue-ink`, `--opacity-muted`, `--radius-sm`, `--shadow-1`, `--size-24`, `--size-28`, `--space-xs`, `--span-lane-width`, `--span-left`, `--span-width`, `--z-sticky`.

## Also exported from this folder

`SpanLane`.
