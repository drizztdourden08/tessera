# Grid

Lays items out in equal columns, such as file tiles, a gallery or the Cards of a dashboard.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Grid } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Grid/Grid.tsx`. Its gallery page is Primitives · Layout/Grid (`#/story/primitives-grid--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Items on a grid.

Grid lays out equal columns from a count or a minimum width, with Grid.Cell spans and dense packing for dashboards.

## Use it when

- Items of the same kind sit in equal columns, as many as fit or a fixed count.
- A dashboard sets its panels as Cards on as many columns as fit, some two columns wide or the whole row.

## Use something else when

- The items have their own widths and sit in one row or one column. Use `Flex` instead.
- Blocks stack in one column. Use `Stack` instead.
- The user moves and resizes the panels. Use `DockLayout` instead.

## Rules

- Set minColWidth to fit as many columns of at least that width as the box allows; a column never grows wider than the box.
- Set columns for a fixed count; when both are set, minColWidth wins.
- Wrap an item in Grid.Cell with span={2} to take two columns once two fit, or span="full" for the whole row.
- Set dense so a later small item fills the hole a wide one left; the reading order then differs from the order on screen.
- Items in a row share its height, and a Card in a Grid.Cell fills the cell.

## Accessibility

- It adds no role; pass aria-label, or set it in a section with a heading, when the grid is one region of the page.
- With dense, keep the order of the children the order a reader needs, since the keys and screen readers follow it.

## Example

```tsx
import { Card, Grid, ProgressBar } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const RunDashboard = ({ activity, players }: { activity: ReactNode; players: ReactNode }) => (
  <Grid minColWidth={288} gap="lg" dense aria-label="Randomizer run">
    <Card title="Summary" subtitle="Seed 48213, online">Profile Hyrule run, 3 players.</Card>
    <Card title="Progress"><ProgressBar value={42} max={216} label="Checks taken" /></Card>
    <Card title="Recent activity">{activity}</Card>
    <Grid.Cell span={2}><Card title="Players">{players}</Card></Grid.Cell>
    <Card title="Item pool">216 locations</Card>
  </Grid>
);
```

## Props

- `columns` (optional): `number`.
- `minColWidth` (optional): `number`.
- `gap` (optional): `SpaceToken`, one of `'2xs'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`.
- `dense` (optional): `boolean`.
- `children` (optional): `ReactNode`.

It also takes the 277 attributes it inherits through `HTMLAttributes<HTMLDivElement>`.

## Tokens

It draws on `--space-2xl`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`.
