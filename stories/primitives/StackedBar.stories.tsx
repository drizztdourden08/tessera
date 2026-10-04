/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, StackedBar } from '../../src/primitives';
import type { StackedBarOrientation, StackedBarSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { CATEGORY_SEGMENTS } from './_samples/stacked-bar-samples.constants';
import { MANY_SEGMENTS, MEMORY_SEGMENTS, TONED_SEGMENTS } from '../composites/_samples/chart-samples.constants';
import { formatGigabytes } from '../composites/_samples/format-gigabytes';
import { LiveMemoryBar } from './_samples/LiveMemoryBar';
import './StackedBar.stories.css';

type StackedBarArgs = {
  label: string;
  count: number;
  limit: number;
  total: number;
  legend: boolean;
  size: StackedBarSize;
  orientation: StackedBarOrientation;
  height: number;
};

const ARGS: Partial<StackedBarArgs> = { label: 'Memory', count: 10, limit: 6, total: 12, legend: true, size: 'md', orientation: 'horizontal', height: 192 };

const ARG_TYPES: PlaygroundArgTypes<StackedBarArgs> = {
  label: { group: 'Content', control: 'text', description: 'Names the bar; a screen reader hears every part with it.' },
  count: { group: 'Data', control: 'range', min: 0, max: MANY_SEGMENTS.length, step: 1, description: 'How many processes the sample passes.' },
  limit: { group: 'Data', control: 'range', min: 1, max: 12, step: 1, description: 'Most parts drawn; the smallest past it join Other.' },
  total: { group: 'Value', control: 'range', min: 0, max: 16, step: 1, description: 'The whole. Room the parts leave shows as free; 0 uses their sum.' },
  legend: { group: 'Appearance', control: 'boolean' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'], description: 'The thickness, across or up.' },
  orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
  height: { group: 'Layout', control: 'range', min: 96, max: 320, step: 16, description: 'The column height when vertical.' },
};

const meta = {
  title: 'Primitives · Charts/StackedBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StackedBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <StackedBar
      className="stacked-bar-story"
      segments={MANY_SEGMENTS.slice(0, args.count)}
      limit={args.limit}
      total={args.total || undefined}
      legend={args.legend}
      size={args.size}
      orientation={args.orientation}
      height={args.orientation === 'vertical' ? args.height : undefined}
      label={args.label || undefined}
      format={formatGigabytes}
    />
  ),
} satisfies PlaygroundStory<StackedBarArgs>;

const Memory = {
  name: 'Memory by process, with room left',
  render: () => (
    <Box className="stacked-bar-story">
      <StackedBar segments={MEMORY_SEGMENTS} total={12} legend label="Memory" format={formatGigabytes} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<StackedBarArgs>;

const Grouped = {
  name: 'Many small parts grouped into Other',
  render: () => (
    <Demonstrator
      rows={[{ key: '14', label: 'every part' }, { key: '6', label: 'limit 6' }, { key: '3', label: 'limit 3' }]}
      cell={(limit) => (
        <Box className="stacked-bar-story">
          <StackedBar segments={MANY_SEGMENTS} limit={Number(limit)} legend label="Memory" format={formatGigabytes} />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StackedBarArgs>;

const Colours = {
  name: 'Status tones and tag colours',
  render: () => (
    <Demonstrator
      rows={[{ key: 'tones', label: 'status tones' }, { key: 'tags', label: 'tag colours' }]}
      cell={(kind) => (
        <Box className="stacked-bar-story">
          <StackedBar segments={kind === 'tones' ? TONED_SEGMENTS : CATEGORY_SEGMENTS} limit={10} legend label="Jobs" />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StackedBarArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(['sm', 'md'])}
      cell={(size) => (
        <Box className="stacked-bar-story">
          <StackedBar segments={MEMORY_SEGMENTS} total={12} size={size as StackedBarSize} />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StackedBarArgs>;

const VERTICAL_COLUMNS = [
  { key: 'room', label: 'room left, legend' },
  { key: 'other', label: 'grouped into Other' },
  { key: 'sm', label: 'size sm, no legend' },
];

const Vertical = {
  name: 'Vertical, stacked bottom to top',
  render: () => (
    <Demonstrator
      columns={VERTICAL_COLUMNS}
      valign="end"
      cell={(_row, kind) => (
        <StackedBar
          segments={kind === 'other' ? MANY_SEGMENTS : MEMORY_SEGMENTS}
          total={kind === 'other' ? undefined : 12}
          orientation="vertical"
          height={192}
          size={kind === 'sm' ? 'sm' : 'md'}
          legend={kind !== 'sm'}
          label="Memory"
          format={formatGigabytes}
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StackedBarArgs>;

const Live = {
  name: 'Live, one reading a second',
  render: () => <LiveMemoryBar />,
} satisfies StoryLiteStoryDefinition<StackedBarArgs>;

const renderState = (props: StateProps) => (
  <Box className="stacked-bar-story">
    <StackedBar
      segments={props.empty === true ? [] : MEMORY_SEGMENTS.slice(0, typeof props.count === 'number' ? props.count : 5)}
      total={typeof props.total === 'number' ? props.total : undefined}
      legend
      label="Memory"
      format={formatGigabytes}
    />
  </Box>
);

const Overview = overviewStory({
  component: 'StackedBar',
  description: 'One bar split into parts of a whole, such as memory by process, with a tooltip on each part.',
  points: [
    '`segments` lists the parts; each takes a status tone or a tag `color`, or the next tag colour in turn.',
    '`limit` caps how many parts it draws; the smallest beyond it join one Other part.',
    '`total` sets the whole, so room the parts leave shows as free track.',
    '`legend` lists each part with its swatch and value; `format` writes the values.',
    '`orientation="vertical"` stacks the parts bottom to top in a column `height` tall, the legend beside it.',
    'Point at a part for its name, value and share in a [Tooltip].',
  ],
  instead: '[ProgressBar] for one value toward an end.',
  playground: Playground,
  variants: [Memory, Grouped, Colours, Sizes, Vertical, Live],
  states: {
    render: renderState,
    list: [
      { name: 'Idle' },
      { name: 'With room left', props: { total: 12 } },
      { name: 'One part', props: { count: 1 } },
      { name: 'Empty', props: { empty: true } },
    ],
  },
});

export default meta;
export { Colours, Grouped, Live, Memory, Overview, Playground, Sizes, Vertical };
