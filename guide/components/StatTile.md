# StatTile

A small tile with one headline number: its name, the value with a unit, how it moved, and an optional chart.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { StatTile } from '@drizztdourden08/tessera';
```

The source is `src/composites/StatTile/StatTile.tsx`. Its gallery page is Composites · Charts/StatTile (`#/story/composites-stattile--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A chart. What should the chart show? A headline number with its trend.

StatTile puts one reading, its change and its trend together in a tile sized for a widget grid.

## Use it when

- A dashboard or a widget shows a few key readings, each with its change since the last one.
- A reading needs its trend drawn beside it, such as frame rate with a Sparkline.

## Use something else when

- A plain label and value on one line, with no trend or chart. Use `StatRow` instead.
- One value against its limit, as a round meter. Use [Gauge](Gauge.md) instead.

## Rules

- Set trend from the change, and upIs from what a rise means: good for frame rate, bad for frame time.
- Keep delta short, such as +4 or -2.1, and leave the unit to the unit prop.
- Pass a Sparkline as chart, below the value in a narrow tile and beside it in a wide one.
- Use tone on the value only when the reading is past its limit.
- Pick size md for a widget grid, sm for a dense one and lg for a reading that leads a page.

## Accessibility

- The trend arrow is named Rising, Falling or Steady, so a screen reader hears the direction with the delta.
- The label, value and unit are plain text read in order; the chart speaks only when it has a label.

## Example

```tsx
import { Sparkline, StatTile } from '@drizztdourden08/tessera';

const FrameRateTile = ({ samples }: { samples: readonly number[] }) => (
  <StatTile
    label="Frame rate"
    value={samples[samples.length - 1] ?? 0}
    unit="fps"
    delta="+4"
    trend="up"
    chart={<Sparkline values={samples} min={0} max={165} tone="success" dot />}
  />
);
```

## Props

- `label`: `ReactNode`.
- `value`: `ReactNode`.
- `unit` (optional): `ReactNode`.
- `tone` (optional): `StatusTone`, one of `'neutral'`, `'success'`, `'warning'`, `'danger'`, `'info'`, `'primary'`, `'secondary'`, `'tertiary'`.
- `delta` (optional): `ReactNode`.
- `trend` (optional): `StatTrend`, one of `'up'`, `'down'`, `'flat'`.
- `upIs` (optional): `StatTrendMeaning`, one of `'good'`, `'bad'`, `'neutral'`. Default `'good'`.
- `deltaTone` (optional): `StatusTone`, one of `'neutral'`, `'success'`, `'warning'`, `'danger'`, `'info'`, `'primary'`, `'secondary'`, `'tertiary'`.
- `chart` (optional): `ReactNode`.
- `chartPlacement` (optional): `StatTileChartPlacement`, one of `'below'`, `'beside'`. Default `'below'`.
- `size` (optional): `StatTileSize`, one of `'sm'`, `'md'`, `'lg'`. Default `'md'`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-danger`, `--c-info`, `--c-inset`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tertiary`, `--c-text`, `--c-text-muted`, `--c-warning`, `--radius-md`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-2xl`, `--text-base`, `--text-lg`, `--text-sm`, `--text-xl`, `--text-xs`, `--tracking-wide`, `--weight-semi`.
