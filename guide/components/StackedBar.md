# StackedBar

One horizontal bar split into the parts of a whole, such as memory by process, with a tooltip and a legend.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { StackedBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/StackedBar/StackedBar.tsx`. Its gallery page is Composites · Charts/StackedBar (`#/story/composites-stackedbar--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A chart. What should the chart show? A whole split into parts.

StackedBar shows how one total splits into named parts, in a single bar.

## Use it when

- A total is shared by a few named parts and the reader compares their sizes, such as memory or disk use.
- A count of jobs splits by status, each part in its status tone.

## Use something else when

- One value toward an end, with nothing to split. Use `ProgressBar` instead.
- Rows of exact figures the reader sorts and filters. Use `DataTable` instead.

## Rules

- Give each segment a stable id, so a live bar keeps its parts in place from one update to the next.
- Set limit to the parts worth naming; the smallest beyond it join one Other part.
- Pass total when the parts do not fill the whole, so the room left shows as free track.
- Use status tones when the parts are states and tag colours when they are names; leave color out to cycle the tag colours.

## Accessibility

- With a label, the bar is an image named with every part and its value.
- The legend lists each part as text, so the values never live only in a tooltip.

## Example

```tsx
import { StackedBar } from '@drizztdourden08/tessera';

const gigabytes = (value: number) => `${value.toFixed(1)} GB`;

const MemoryBar = () => (
  <StackedBar
    segments={[{ id: 'game', label: 'Game', value: 4.2 }, { id: 'browser', label: 'Browser', value: 1.8 }]}
    total={16}
    legend
    label="Memory"
    format={gigabytes}
  />
);
```

## Props

- `segments`: `readonly StackedBarSegment[]`.
- `total` (optional): `number`.
- `limit` (optional): `number`. Default `DEFAULT_LIMIT`.
- `legend` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `size` (optional): `StackedBarSize`, one of `'sm'`, `'md'`. Default `'md'`.
- `format` (optional): `(value: number) => string`. Default `formatAmount`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-danger`, `--c-hover`, `--c-info`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tag-amber`, `--c-tag-blue`, `--c-tag-cyan`, `--c-tag-green`, `--c-tag-lime`, `--c-tag-orange`, `--c-tag-pink`, `--c-tag-rose`, `--c-tag-teal`, `--c-tag-violet`, `--c-tertiary`, `--c-text-dim`, `--c-text-muted`, `--c-warning`, `--radius-pill`, `--radius-sm`, `--size-1`, `--size-12`, `--size-6`, `--size-8`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-xs`.
