# Sparkline

A small line or area chart of the latest samples, so a reader sees which way a value moves at a glance.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Sparkline } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Sparkline/Sparkline.tsx`. Its gallery page is Primitives · Charts/Sparkline (`#/story/primitives-sparkline--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A chart. What should the chart show? A trend over recent samples.

Sparkline draws the recent samples of one reading as a line or an area, with no axes.

## Use it when

- A live reading, such as frame rate or download speed, needs its recent history beside the number.
- A tile or a row has room for a trend but not for a full chart with axes.

## Use something else when

- The number and its change matter more than the shape, in a tile of its own. Use [StatTile](StatTile.md) instead.
- One value against its limit, with no history. Use [Gauge](Gauge.md) instead.

## Rules

- Pass the samples newest last, and set length to the window, so a new series fills in from the right.
- Fix min and max for a reading with known bounds, such as a percentage; leave them out to follow the samples.
- Use band for the zone that matters, such as a warning above 80, and dot to mark where the latest sample sits.
- Give it a width and height, or a box to fill; it is 32 px tall when nothing sets its height.

## Accessibility

- It is hidden from screen readers unless it has a label, since the number beside it usually says the same.
- With a label, a screen reader hears the name with the latest, lowest and highest sample.

## Example

```tsx
import { Sparkline } from '@drizztdourden08/tessera';

const FrameRateTrend = ({ samples }: { samples: readonly number[] }) => (
  <Sparkline values={samples} length={40} min={0} max={165} band={{ from: 0, to: 60, tone: 'danger' }} tone="success" dot label="Frame rate" />
);
```

## Props

- `values`: `readonly number[]`.
- `variant` (optional): `SparklineVariant`, one of `'line'`, `'area'`. Default `'line'`.
- `length` (optional): `number`.
- `min` (optional): `number`.
- `max` (optional): `number`.
- `band` (optional): `SparklineBand`.
- `dot` (optional): `boolean`. Default `false`.
- `tone` (optional): `SparklineTone`. Default `'primary'`.
- `width` (optional): `number`.
- `height` (optional): `number`.
- `label` (optional): `string`.
- `format` (optional): `(value: number) => string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-danger`, `--c-info`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tag-amber`, `--c-tag-blue`, `--c-tag-cyan`, `--c-tag-green`, `--c-tag-lime`, `--c-tag-orange`, `--c-tag-pink`, `--c-tag-rose`, `--c-tag-teal`, `--c-tag-violet`, `--c-tertiary`, `--c-text-muted`, `--c-warning`, `--opacity-muted`, `--size-32`, `--size-6`.
