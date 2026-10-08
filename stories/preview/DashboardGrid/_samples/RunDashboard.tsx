/* @layer stories @kind component */
import { StatTile } from '../../../../src/composites';
import { Card, Grid, Paragraph, ProgressBar, Stack } from '../../../../src/primitives';
import { DenseGrid } from '../DenseGrid';
import { GridCell } from '../GridCell';
import { DASHBOARD_TEXT as T } from './dashboard-story.constants';

const Lines = ({ lines }: { lines: readonly string[] }) => (
  <Stack gap="xs">{lines.map((line) => <Paragraph key={line}>{line}</Paragraph>)}</Stack>
);

const RunDashboard = () => (
  <DenseGrid label={T.label}>
    <Card title={T.summary} subtitle={T.summarySub}><Paragraph>{T.summaryLine}</Paragraph></Card>
    <Card title={T.progress}>
      <Stack gap="sm" align="stretch">
        <ProgressBar value={42} max={216} secondaryValue={61} tone="success" secondaryTone="warning" label={T.progressLabel} />
        <Grid minColWidth={128} gap="sm">
          {T.tiles.map((tile) => <StatTile key={tile.label} label={tile.label} value={tile.value} size="sm" />)}
        </Grid>
      </Stack>
    </Card>
    <GridCell span={2}><Card title={T.activity}><Lines lines={T.activityLines} /></Card></GridCell>
    <Card title={T.players}><Lines lines={T.playerNames} /></Card>
    <GridCell span="full"><Card title={T.options}><Paragraph>{T.optionsLine}</Paragraph></Card></GridCell>
  </DenseGrid>
);

export { RunDashboard };
