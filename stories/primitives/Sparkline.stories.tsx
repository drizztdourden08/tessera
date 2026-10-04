/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Sparkline } from '../../src/primitives';
import type { SparklineTone, SparklineVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { CPU_SERIES, FLAT_SERIES } from '../composites/_samples/chart-samples.constants';
import { LiveSparklines } from './_samples/LiveSparklines';
import { BAND_SAMPLES, SPARKLINE_TONES } from './_samples/sparkline-samples.constants';
import './Sparkline.stories.css';

type SparklineArgs = {
  label: string;
  variant: SparklineVariant;
  tone: SparklineTone;
  length: number;
  domain: 'auto' | 'fixed';
  band: boolean;
  bandFrom: number;
  bandTone: SparklineTone;
  dot: boolean;
};

const ARGS: Partial<SparklineArgs> = {
  label: 'CPU', variant: 'line', tone: 'primary', length: 24, domain: 'fixed', band: true, bandFrom: 80, bandTone: 'warning', dot: true,
};

const ARG_TYPES: PlaygroundArgTypes<SparklineArgs> = {
  label: { group: 'Content', control: 'text', description: 'Names the chart for a screen reader. Empty keeps it decorative.' },
  length: { group: 'Value', control: 'range', min: 4, max: 40, step: 1, description: 'How many samples fit across; fewer start further right.' },
  domain: { group: 'Value', control: 'select', options: ['auto', 'fixed'], description: 'Fixed runs from 0 to 100; auto follows the samples.' },
  bandFrom: { group: 'Value', control: 'range', min: 0, max: 100, step: 5, description: 'Where the band starts. It runs to the top.' },
  variant: { group: 'Appearance', control: 'select', options: ['line', 'area'] },
  tone: { group: 'Appearance', control: 'select', options: [...SPARKLINE_TONES] },
  band: { group: 'Appearance', control: 'boolean' },
  bandTone: { group: 'Appearance', control: 'select', options: [...SPARKLINE_TONES] },
  dot: { group: 'Appearance', control: 'boolean', description: 'Marks the latest sample; it takes the band tone inside the band.' },
};

const meta = {
  title: 'Primitives · Charts/Sparkline',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SparklineArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Sparkline
      width={256}
      height={48}
      values={CPU_SERIES.slice(-args.length)}
      length={args.length}
      variant={args.variant}
      tone={args.tone}
      min={args.domain === 'fixed' ? 0 : undefined}
      max={args.domain === 'fixed' ? 100 : undefined}
      band={args.band ? { from: args.bandFrom, tone: args.bandTone } : undefined}
      dot={args.dot}
      label={args.label || undefined}
    />
  ),
} satisfies PlaygroundStory<SparklineArgs>;

const LineAndArea = {
  name: 'Line and area in status tones and tag colours',
  render: () => (
    <Demonstrator
      rows={axis(SPARKLINE_TONES)}
      columns={axis(['line', 'area'])}
      cell={(tone, variant) => (
        <Box className="sparkline-story">
          <Sparkline values={CPU_SERIES} tone={tone} variant={variant as SparklineVariant} min={0} max={100} dot />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<SparklineArgs>;

const Bands = {
  name: 'Threshold bands',
  render: () => (
    <Demonstrator
      rows={BAND_SAMPLES}
      cell={(key) => {
        const sample = BAND_SAMPLES.find((entry) => entry.key === key);
        return (
          <Box className="sparkline-story sparkline-story--wide">
            <Sparkline values={sample?.values ?? []} band={sample?.band} min={0} max={sample?.max} tone={sample?.tone} dot />
          </Box>
        );
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<SparklineArgs>;

const Domains = {
  name: 'Auto domain or a fixed one',
  render: () => (
    <Demonstrator
      columns={[{ key: 'auto', label: 'auto' }, { key: 'fixed', label: '0 to 200' }]}
      cell={(_row, domain) => (
        <Box className="sparkline-story">
          <Sparkline values={CPU_SERIES} max={domain === 'fixed' ? 200 : undefined} min={domain === 'fixed' ? 0 : undefined} variant="area" />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<SparklineArgs>;

const Sized = {
  name: 'Sized by its box or by width and height',
  render: () => (
    <Demonstrator
      columns={[{ key: 'box', label: 'fills its box' }, { key: 'props', label: 'width 96, height 20' }]}
      cell={(_row, how) => (how === 'box'
        ? <Box className="sparkline-story sparkline-story--wide"><Sparkline values={CPU_SERIES} /></Box>
        : <Sparkline values={CPU_SERIES} width={96} height={20} />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<SparklineArgs>;

const Live = {
  name: 'Live, one sample a second',
  render: () => <LiveSparklines />,
} satisfies StoryLiteStoryDefinition<SparklineArgs>;

const renderState = (props: StateProps) => (
  <Box className="sparkline-story sparkline-story--wide">
    <Sparkline
      values={Array.isArray(props.values) ? props.values : CPU_SERIES.slice(0, 12)}
      length={24}
      min={0}
      max={100}
      band={{ from: 80, tone: 'warning' }}
      dot
    />
  </Box>
);

const Overview = overviewStory({
  component: 'Sparkline',
  description: 'A small line or area chart of the latest samples, for a trend at a glance.',
  points: [
    '`values` holds the samples, newest last; `length` keeps room for that many, so new ones fill in from the right.',
    '`min` and `max` fix the domain; leave either out and it follows the samples.',
    '`band` shades a zone, such as a warning above 80, and `dot` marks the latest sample in the band tone.',
    'It fills its box in width and is 32 px tall; `width` and `height` size it alone.',
    '**Decorative by default:** pass `label` and a screen reader hears the latest, low and high values.',
  ],
  instead: '[StatTile] to show the number itself beside its trend.',
  playground: Playground,
  variants: [LineAndArea, Bands, Domains, Sized, Live],
  states: {
    render: renderState,
    list: [
      { name: 'Filling in' },
      { name: 'Full', props: { values: CPU_SERIES } },
      { name: 'Latest in the band', props: { values: [...CPU_SERIES.slice(0, 20), 84, 88, 91, 86] } },
      { name: 'Flat', props: { values: FLAT_SERIES } },
      { name: 'No samples yet', props: { values: [] } },
    ],
  },
});

export default meta;
export { Bands, Domains, LineAndArea, Live, Overview, Playground, Sized };
