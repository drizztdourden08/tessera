# Gauge

A small round meter that shows one value against its limit, coloured by the zone the value is in.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Gauge } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Gauge/Gauge.tsx`. Its gallery page is Primitives · Charts/Gauge (`#/story/primitives-gauge--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A chart. What should the chart show? One value against its limit.

Gauge shows where one reading sits between its bounds, in the tone of its zone.

## Use it when

- A load, a temperature or a fill level reads best as a share of its maximum, such as CPU use.
- A panel shows a few such readings side by side and each needs its own colour for good, warning and danger.

## Use something else when

- Progress toward the end of a task, such as a download. Use `ProgressRing` instead.
- The history of a reading matters more than where it sits now. Use [Sparkline](Sparkline.md) instead.

## Rules

- Pass min and max when the range is not 0 to 100, and a unit for the value in the middle.
- Leave tone out so the zone sets it; set thresholds when the default edges at 60% and 85% do not fit.
- Put the danger edge below the warning edge for a reading where low is bad, such as frame rate.
- Pick sm for a dense row, md for a panel and lg for a page about that one reading.

## Accessibility

- It is a meter: a screen reader hears its label, its value with the unit, and its bounds.
- Without a label it is named Meter; give each gauge a label so they can be told apart.

## Example

```tsx
import { Gauge } from '@drizztdourden08/tessera';

const CpuGauge = ({ load }: { load: number }) => <Gauge value={load} unit="%" label="CPU" zones />;
```

## Props

- `value`: `number`.
- `min` (optional): `number`. Default `0`.
- `max` (optional): `number`. Default `100`.
- `thresholds` (optional): `GaugeThresholds`.
- `tone` (optional): `StatusTone`, one of `'neutral'`, `'success'`, `'warning'`, `'danger'`, `'info'`, `'primary'`, `'secondary'`, `'tertiary'`.
- `unit` (optional): `string`.
- `label` (optional): `string`.
- `size` (optional): `GaugeSize`, one of `'sm'`, `'md'`, `'lg'`. Default `'md'`.
- `zones` (optional): `boolean`. Default `false`.
- `format` (optional): `(value: number) => string`. Default `formatReading`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-danger`, `--c-hover`, `--c-info`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tertiary`, `--c-text`, `--c-text-muted`, `--c-warning`, `--duration-slow`, `--ease-standard`, `--leading-tight`, `--size-128`, `--size-48`, `--size-80`, `--space-2xs`, `--text-2xl`, `--text-lg`, `--text-sm`, `--text-xs`, `--weight-semi`.
