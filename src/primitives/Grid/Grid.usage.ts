/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Lays items out in equal columns, such as file tiles, a gallery or the Cards of a dashboard.',
  useWhen: [
    'Items of the same kind sit in equal columns, as many as fit or a fixed count.',
    'A dashboard sets its panels as Cards on as many columns as fit, some two columns wide or the whole row.',
  ],
  avoidWhen: [
    { case: 'The items have their own widths and sit in one row or one column.', use: 'Flex' },
    { case: 'Blocks stack in one column.', use: 'Stack' },
    { case: 'The user moves and resizes the panels.', use: 'DockLayout' },
  ],
  rules: [
    'Set minColWidth to fit as many columns of at least that width as the box allows; a column never grows wider than the box.',
    'Set columns for a fixed count; when both are set, minColWidth wins.',
    'Wrap an item in Grid.Cell with span={2} to take two columns once two fit, or span="full" for the whole row.',
    'Set dense so a later small item fills the hole a wide one left; the reading order then differs from the order on screen.',
    'Items in a row share its height, and a Card in a Grid.Cell fills the cell.',
  ],
  a11y: [
    'It adds no role; pass aria-label, or set it in a section with a heading, when the grid is one region of the page.',
    'With dense, keep the order of the children the order a reader needs, since the keys and screen readers follow it.',
  ],
  tree: {
    path: ['layout', 'items on a grid'],
    rule: 'Grid lays out equal columns from a count or a minimum width, with Grid.Cell spans and dense packing for dashboards.',
  },
  example: `import { Card, Grid, ProgressBar } from '@drizztdourden08/tessera';
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
`,
  propsHash: '73fef41d35d1ad62',
} satisfies ComponentUsage;

export { usage };
