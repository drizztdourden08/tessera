/* @layer stories @kind component */
import { StatTile } from '../../../src/composites';
import { Card, Grid, Paragraph, ProgressBar, Stack, StatRow } from '../../../src/primitives';
import { RUN_PLAYERS, RUN_SETTINGS, RUN_SPANS as SPAN, RUN_TEXT as T, RUN_TILES } from './run-dashboard.constants';

const Lines = ({ lines }: { lines: readonly string[] }) => (
  <Stack gap="xs">{lines.map((line) => <Paragraph key={line}>{line}</Paragraph>)}</Stack>
);

const RunDashboard = () => (
  <Grid minColWidth={288} gap="lg" dense aria-label={T.label}>
    <Grid.Cell span={SPAN.summary}><Card title={T.summary} subtitle={T.summarySub}><Paragraph>{T.summaryLine}</Paragraph></Card></Grid.Cell>
    <Grid.Cell span={SPAN.progress}>
      <Card title={T.progress}>
        <Stack gap="sm" align="stretch">
          <ProgressBar value={42} max={216} secondaryValue={61} tone="success" secondaryTone="warning" label={T.progressLabel} />
          <Grid minColWidth={96} gap="sm">
            {RUN_TILES.map((tile) => <StatTile key={tile.label} label={tile.label} value={tile.value} size="sm" />)}
          </Grid>
        </Stack>
      </Card>
    </Grid.Cell>
    <Grid.Cell span={SPAN.activity}><Card title={T.activity}><Lines lines={T.activityLines} /></Card></Grid.Cell>
    <Grid.Cell span={SPAN.players}>
      <Card title={T.players}><Stack gap="xs">{RUN_PLAYERS.map((row) => <StatRow key={row.label} label={row.label} value={row.value} />)}</Stack></Card>
    </Grid.Cell>
    <Grid.Cell span={SPAN.pool}><Card title={T.pool}><Lines lines={T.poolLines} /></Card></Grid.Cell>
    <Grid.Cell span={SPAN.settings}>
      <Card title={T.settings}>
        <Grid minColWidth={128} gap="sm">
          {RUN_SETTINGS.map((tile) => <StatTile key={tile.label} label={tile.label} value={tile.value} size="sm" />)}
        </Grid>
      </Card>
    </Grid.Cell>
  </Grid>
);

export { RunDashboard };
