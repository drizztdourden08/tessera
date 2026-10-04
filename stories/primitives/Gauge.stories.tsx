/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Flex, Gauge } from '../../src/primitives';
import type { GaugeSize, StatusTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { HEAT_THRESHOLDS } from '../composites/_samples/performance-panel.constants';
import { FPS_THRESHOLDS, GAUGE_LEVELS } from './_samples/gauge-samples.constants';
import { LiveGauges } from './_samples/LiveGauges';

type GaugeArgs = {
  value: number;
  max: number;
  warning: number;
  danger: number;
  unit: string;
  label: string;
  size: GaugeSize;
  tone: StatusTone | 'by threshold';
  zones: boolean;
};

const SIZES: readonly GaugeSize[] = ['sm', 'md', 'lg'];

const TONES: readonly (StatusTone | 'by threshold')[] = ['by threshold', 'primary', 'info', 'neutral'];

const ARGS: Partial<GaugeArgs> = {
  value: 62, max: 100, warning: 60, danger: 85, unit: '%', label: 'CPU', size: 'md', tone: 'by threshold', zones: true,
};

const ARG_TYPES: PlaygroundArgTypes<GaugeArgs> = {
  label: { group: 'Content', control: 'text' },
  unit: { group: 'Content', control: 'text' },
  value: { group: 'Value', control: 'range', min: 0, max: 200, step: 1 },
  max: { group: 'Value', control: 'range', min: 10, max: 200, step: 10 },
  warning: { group: 'Value', control: 'range', min: 0, max: 200, step: 5, description: 'The value where the warning tone starts.' },
  danger: { group: 'Value', control: 'range', min: 0, max: 200, step: 5, description: 'The value where the danger tone starts. Below warning, low is bad.' },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  tone: { group: 'Appearance', control: 'select', options: [...TONES], description: 'A fixed tone, or the tone of the zone the value is in.' },
  zones: { group: 'Appearance', control: 'boolean', description: 'Tints the track with the three zones.' },
};

const meta = {
  title: 'Primitives · Charts/Gauge',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GaugeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Gauge
      value={args.value}
      max={args.max}
      thresholds={{ warning: args.warning, danger: args.danger }}
      unit={args.unit || undefined}
      label={args.label || undefined}
      size={args.size}
      tone={args.tone === 'by threshold' ? undefined : args.tone}
      zones={args.zones}
    />
  ),
} satisfies PlaygroundStory<GaugeArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      columns={axis(SIZES)}
      valign="end"
      cell={(_row, size) => <Gauge value={47} unit="%" label="GPU" size={size} zones />}
    />
  ),
} satisfies StoryLiteStoryDefinition<GaugeArgs>;

const Levels = {
  name: 'Tone by threshold',
  render: () => (
    <Demonstrator
      columns={GAUGE_LEVELS}
      cell={(_row, key) => <Gauge value={GAUGE_LEVELS.find((level) => level.key === key)?.value ?? 0} unit="%" label="CPU" zones />}
    />
  ),
} satisfies StoryLiteStoryDefinition<GaugeArgs>;

const OwnThresholds = {
  name: 'Thresholds of its own',
  render: () => (
    <Flex gap="xl" align="start">
      <Gauge value={78} max={100} unit="°C" label="GPU heat" thresholds={HEAT_THRESHOLDS} zones />
      <Gauge value={41} max={165} unit="fps" label="Frame rate, low is bad" thresholds={FPS_THRESHOLDS} zones />
      <Gauge value={63} unit="%" label="Fixed tone" tone="info" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<GaugeArgs>;

const Live = {
  name: 'Live, one reading a second',
  render: () => <LiveGauges />,
} satisfies StoryLiteStoryDefinition<GaugeArgs>;

const renderState = (props: StateProps) => (
  <Gauge value={typeof props.value === 'number' ? props.value : 34} unit="%" label="CPU" zones />
);

const Overview = overviewStory({
  component: 'Gauge',
  description: 'A small round meter that shows one value against its limit, with the value in the middle.',
  points: [
    '`value` runs from `min` to `max`, 0 to 100 by default; the arc fills to it and stops at either end.',
    'The tone follows the zone: success, then `warning` at 60%, then `danger` at 85%.',
    '`thresholds` move the zones; a danger edge below the warning edge means a low value is bad.',
    '`unit` sits after the value, `label` names it below, and `zones` tints the track.',
    '`tone` fixes the colour, for a reading with no good or bad side.',
  ],
  instead: '[ProgressRing] for progress toward the end of a task.',
  playground: Playground,
  variants: [Sizes, Levels, OwnThresholds, Live],
  states: {
    render: renderState,
    list: [
      { name: 'Idle' },
      { name: 'Empty', props: { value: 0 } },
      { name: 'Full', props: { value: 100 } },
      { name: 'Past its max', props: { value: 140 } },
    ],
  },
});

export default meta;
export { Levels, Live, Overview, OwnThresholds, Playground, Sizes };
