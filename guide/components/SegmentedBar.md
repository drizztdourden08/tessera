# SegmentedBar

One bar of equal segments with a gap between them, each in its own colour, with a tooltip per segment and no text inside.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { SegmentedBar } from '@drizztdourden08/tessera';
```

The source is `src/primitives/SegmentedBar/SegmentedBar.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? Data. What data are you showing? A chart. What should the chart show? Equal segments in a row.

SegmentedBar shows a run of equal steps, each in its own colour, in a single bar.

## Use it when

- A run of steps or checks is shown as one segment each, such as passed, failed and pending.
- The whole bar opens a detail view when pressed.

## Use something else when

- The parts differ in size and share a total. Use [StackedBar](StackedBar.md) instead.
- One value toward an end, with nothing to split. Use `ProgressBar` instead.

## Rules

- Give every segment a tone and a label; the label is its tooltip.
- Use status tones when segments are states, tag colours when they are names, and track for a segment not reached yet.
- Give the bar a label that names the whole, since the segments hold no text.
- Pass onClick only when the whole bar does something; it then acts as one button, with Enter and Space too.

## Accessibility

- The bar is a group named by its label, or a button named by it when onClick is set.
- A tooltip is not the only place a state may live; keep the same facts in text near the bar.

## Example

```tsx
import { SegmentedBar } from '@drizztdourden08/tessera';

const RunBar = () => (
  <SegmentedBar
    label="Checks"
    segments={[{ tone: 'success', label: 'Lint passed' }, { tone: 'danger', label: 'Tests failed' }, { tone: 'track', label: 'Build pending' }]}
  />
);
```

## Props

- `segments`: `readonly SegmentedBarSegment[]`.
- `label`: `string`.
- `onClick` (optional): `() => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-danger`, `--c-hover`, `--c-info`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tag-amber`, `--c-tag-blue`, `--c-tag-cyan`, `--c-tag-green`, `--c-tag-lime`, `--c-tag-orange`, `--c-tag-pink`, `--c-tag-rose`, `--c-tag-teal`, `--c-tag-violet`, `--c-tertiary`, `--c-text-muted`, `--c-warning`, `--radius-sm`, `--size-2`, `--size-6`.
