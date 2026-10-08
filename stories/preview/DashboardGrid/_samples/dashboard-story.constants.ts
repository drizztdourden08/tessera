/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

const DASHBOARD_TEXT = {
  label: 'Randomizer run',
  summary: 'Summary',
  summarySub: 'Seed 48213, online',
  summaryLine: 'Profile Hyrule run, 3 players, started 20 minutes ago.',
  progress: 'Progress',
  progressLabel: 'Checks taken',
  activity: 'Recent activity',
  activityLines: ['Ganon Fan found the Hookshot.', 'Zelda sent the Moon Pearl.', 'Link reached Death Mountain.'],
  players: 'Players',
  playerNames: ['Ganon Fan', 'Zelda', 'Link'],
  options: 'Options summary',
  optionsLine: 'Open mode, keysanity off, Progressive Ocarina on.',
  tiles: [{ label: 'checks taken', value: '42 of 216' }, { label: 'available', value: '19' }, { label: 'left', value: '174' }],
} as const;

const DASHBOARD_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. No new part: Grid gains dense and Grid.Cell, the panel is Card',
    badge: 'Recommended',
    tone: 'success',
    text: 'Grid already fills as many columns as fit, and Card already takes a title, a subtitle and buttons. Grid gains dense, columns that never outgrow a narrow screen, and Grid.Cell with span 2 or full. DashboardGrid and DashboardPanel in RotP become this recipe.',
  },
  {
    name: 'B. DashboardGrid and DashboardPanel as RotP has them',
    badge: 'Considered',
    text: 'Two new parts. DashboardPanel is a Card with a SectionHeader, and DashboardGrid is Grid with dense: both would copy what Tessera already has.',
  },
  {
    name: 'C. Card gains span',
    badge: 'Considered',
    text: 'No sub-part, but Card would carry a grid rule that means nothing outside a Grid, and only Cards could span.',
  },
];

const DASHBOARD_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'DashboardGrid', badge: 'Grid', tone: 'success', text: 'Columns no narrower than a set width, as many as fit: Grid minColWidth does this today. Dense packing and the narrow-screen limit are the two new props.' },
  { name: 'DashboardPanel', badge: 'Card', tone: 'success', text: 'A titled card with a line under the title and a button at the right: Card title, subtitle and actions.' },
  { name: 'span 2 and full', badge: 'Grid.Cell', tone: 'info', text: 'Two columns once two fit, or the whole row: the one new sub-part.' },
  { name: 'StatTileGrid in the Progress panel', badge: 'StatTile', tone: 'success', text: 'Tessera has StatTile; a row of them is a Grid.' },
];

const DASHBOARD_CODE = `import { Card, Grid, ProgressBar } from '@drizztdourden08/tessera';

<Grid minColWidth={288} gap="lg" dense>
  <Card title="Summary" subtitle="Seed 48213, online">{summary}</Card>
  <Card title="Progress"><ProgressBar value={42} max={216} /></Card>
  <Grid.Cell span={2}><Card title="Recent activity">{activity}</Card></Grid.Cell>
  <Grid.Cell span="full"><Card title="Options summary">{options}</Card></Grid.Cell>
</Grid>`;

export { DASHBOARD_CHOICES, DASHBOARD_CODE, DASHBOARD_MAPPING, DASHBOARD_TEXT };
