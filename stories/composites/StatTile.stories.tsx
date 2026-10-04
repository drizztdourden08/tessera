/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { StatTile } from '../../src/composites';
import type { StatTileChartPlacement, StatTileSize, StatTrend, StatTrendMeaning } from '../../src/composites';
import { Sparkline } from '../../src/primitives';
import type { StatusTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { STAT_TILE_TRENDS } from './_samples/stat-tile-trends.constants';
import type { SampleChartKind } from './_samples/sample-chart.type';
import { FPS_SERIES, NET_SERIES } from './_samples/chart-samples.constants';
import './StatTile.stories.css';

type StatTileArgs = {
  label: string;
  value: string;
  unit: string;
  delta: string;
  trend: StatTrend | 'none';
  upIs: StatTrendMeaning;
  tone: StatusTone | 'none';
  chart: SampleChartKind;
  chartPlacement: StatTileChartPlacement;
  size: StatTileSize;
};

const TONES: readonly (StatusTone | 'none')[] = ['none', 'success', 'warning', 'danger', 'info', 'primary'];

const ARGS: Partial<StatTileArgs> = {
  label: 'Frame rate', value: '144', unit: 'fps', delta: '+4', trend: 'up', upIs: 'good', tone: 'none', chart: 'line', chartPlacement: 'below', size: 'md',
};

const ARG_TYPES: PlaygroundArgTypes<StatTileArgs> = {
  label: { group: 'Content', control: 'text' },
  value: { group: 'Content', control: 'text' },
  unit: { group: 'Content', control: 'text' },
  delta: { group: 'Content', control: 'text', description: 'The change since the last reading. Empty hides it.' },
  chart: { group: 'Content', control: 'select', options: ['none', 'line', 'area'], description: 'A Sparkline passed as chart.' },
  trend: { group: 'Value', control: 'select', options: ['none', 'up', 'down', 'flat'] },
  upIs: { group: 'Value', control: 'select', options: ['good', 'bad', 'neutral'], description: 'Whether a rise reads as good news.' },
  tone: { group: 'Appearance', control: 'select', options: [...TONES], description: 'Colours the value, for a reading in alarm.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md', 'lg'] },
  chartPlacement: { group: 'Layout', control: 'select', options: ['below', 'beside'] },
};

const meta = {
  title: 'Composites · Charts/StatTile',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StatTileArgs>;

const chartOf = (kind: SampleChartKind) => {
  if (kind === 'line') return <Sparkline values={FPS_SERIES} min={0} max={165} tone="success" dot />;
  if (kind === 'area') return <Sparkline values={NET_SERIES} min={0} variant="area" tone="info" />;
  return undefined;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <StatTile
      className="stat-tile-story"
      label={args.label}
      value={args.value}
      unit={args.unit || undefined}
      delta={args.delta || undefined}
      trend={args.trend === 'none' ? undefined : args.trend}
      upIs={args.upIs}
      tone={args.tone === 'none' ? undefined : args.tone}
      chart={chartOf(args.chart)}
      chartPlacement={args.chartPlacement}
      size={args.size}
    />
  ),
} satisfies PlaygroundStory<StatTileArgs>;

const Tones = {
  name: 'Values, units and tones',
  render: () => (
    <Demonstrator
      columns={axis(TONES.slice(0, 5))}
      cell={(_row, tone) => (
        <StatTile className="stat-tile-story--narrow" label="GPU heat" value="81" unit="°C" tone={tone === 'none' ? undefined : tone} />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatTileArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      columns={axis(['sm', 'md', 'lg'])}
      valign="end"
      cell={(_row, size) => (
        <StatTile className="stat-tile-story" label="Frame rate" value="144" unit="fps" delta="+4" trend="up" size={size as StatTileSize} />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatTileArgs>;

const Trends = {
  name: 'Trends and what they mean',
  render: () => (
    <Demonstrator
      rows={STAT_TILE_TRENDS}
      cell={(key) => {
        const row = STAT_TILE_TRENDS.find((entry) => entry.key === key);
        return <StatTile className="stat-tile-story" label="Reading" value="61" unit="ms" delta={row?.delta} trend={row?.trend} upIs={row?.upIs} />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatTileArgs>;

const Placements = {
  name: 'Chart below, beside or none',
  render: () => (
    <Demonstrator
      columns={axis(['below', 'beside', 'none'])}
      valign="start"
      cell={(_row, place) => (
        <StatTile
          className={place === 'beside' ? 'stat-tile-story stat-tile-story--wide' : 'stat-tile-story'}
          label="Download"
          value="26.4"
          unit="Mb/s"
          delta="+9.1"
          trend="up"
          upIs="neutral"
          chart={chartOf(place === 'none' ? 'none' : 'area')}
          chartPlacement={place === 'beside' ? 'beside' : 'below'}
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatTileArgs>;

const renderState = (props: StateProps) => (
  <StatTile
    className="stat-tile-story"
    label="Frame rate"
    value={typeof props.value === 'string' ? props.value : '144'}
    unit="fps"
    tone={props.alarm === true ? 'danger' : undefined}
    delta={typeof props.delta === 'string' ? props.delta : undefined}
    trend={props.trend === 'down' || props.trend === 'up' ? props.trend : undefined}
    chart={<Sparkline values={FPS_SERIES} min={0} max={165} tone="success" dot />}
  />
);

const Overview = overviewStory({
  component: 'StatTile',
  description: 'One headline number in a small tile: its name, the value with a unit, how it moved, and a chart.',
  points: [
    '`delta` and `trend` show how the value moved; `upIs` says whether a rise is good, bad or neither.',
    '`chart` takes a [Sparkline] or any small chart, `below` the value or `beside` it.',
    '`tone` colours the value itself, for a reading past its limit.',
    '`size` picks sm, md or lg; a tile fills its grid cell, so several sit side by side in a widget.',
  ],
  instead: '[StatRow] for a plain label and value on one line, with no trend or chart.',
  playground: Playground,
  variants: [Tones, Trends, Placements, Sizes],
  states: {
    render: renderState,
    list: [
      { name: 'Idle' },
      { name: 'Rising', props: { value: '144', delta: '+6', trend: 'up' } },
      { name: 'Falling', props: { value: '97', delta: '-47', trend: 'down' } },
      { name: 'In alarm', props: { value: '52', delta: '-45', trend: 'down', alarm: true } },
    ],
  },
});

export default meta;
export { Overview, Placements, Playground, Sizes, Tones, Trends };
