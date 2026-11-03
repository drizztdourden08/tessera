# ScrubRuler

A ruler over a row of cells that the user drags along to move the current cell, with markers, a range band and ticks.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ScrubRuler } from '@drizztdourden08/tessera';
```

The source is `src/composites/ScrubRuler/ScrubRuler.tsx`. Its gallery page is Composites · Inputs/ScrubRuler (`#/story/composites-scrubruler--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A range.

ScrubRuler sets one current cell on a row of cells, with markers and a band, where SpanBar sets a range of cells.

## Use it when

- The user scrubs through frames, steps or time and one cell is current.
- Markers such as a hit frame, or a range of cells to loop, sit on the same ruler.

## Use something else when

- A range of cells is moved or stretched as one piece. Use [SpanBar](SpanBar.md) instead.
- The value is a plain number with no cells behind it. Use `Slider` instead.

## Rules

- Pass the same cells as the SpanBar rows below it, so the ticks line up with the bars.
- Keep value, markers and band in the parent and write them back from onChange, onMarkerChange and onBandChange.
- Give every marker an id, a label and the min and max it may be dragged between.
- Leave tickEvery on auto unless the ticks must fall on a fixed step; tickLabel writes the text of each tick.
- Set readOnly to keep the ruler focusable and block every change.

## Accessibility

- The track is a slider with a value text such as Frame 4 of 16.
- Arrows step one cell, Page Up and Page Down step ten, Home and End jump to the ends.
- Each marker is a slider of its own with its label, moved by the same keys.
- A clear button removes the band and has a name.

## Example

```tsx
import { ScrubRuler } from '@drizztdourden08/tessera';
import type { CellGeometry } from '@drizztdourden08/tessera';

const Timeline = ({ cells, frame, setFrame }: { cells: CellGeometry; frame: number; setFrame: (index: number) => void }) => (
  <ScrubRuler cells={cells} value={frame} onChange={setFrame} label="Frames" />
);
```

## Props

- `cells`: `CellGeometry`.
- `value`: `number`.
- `onChange` (optional): `(index: number) => void`.
- `tickLabel` (optional): `(index: number) => string`.
- `tickEvery` (optional): `number | 'auto'`.
- `markers` (optional): `readonly RulerMarker[]`. Default `[]`.
- `onMarkerChange` (optional): `(id: string, index: number) => void`.
- `band` (optional): `RulerBand | null`. Default `null`.
- `onBandChange` (optional): `(band: RulerBand | null) => void`.
- `bandLabel` (optional): `(band: RulerBand) => string`.
- `valueText` (optional): `(index: number, count: number) => string`.
- `label` (optional): `string`.
- `readOnly` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-primary`, `--c-primary-glow`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-soft`, `--c-selected`, `--c-surface`, `--c-text`, `--c-text-muted`, `--hue-ink`, `--scrub-cell`, `--scrub-left`, `--scrub-width`, `--size-16`, `--size-24`, `--size-28`, `--space-2xs`, `--weight-bold`.
