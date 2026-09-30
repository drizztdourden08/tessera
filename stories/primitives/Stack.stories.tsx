/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Stack, StatRow, Text } from '../../src/primitives';
import type { FlexAlign, SpaceToken } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type StackArgs = {
  gap: SpaceToken;
  align: FlexAlign;
};

const GAPS: readonly SpaceToken[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const SETTINGS = [
  { label: 'Display scale', value: '3x' },
  { label: 'Aspect ratio', value: '4:3' },
  { label: 'Audio latency', value: '64 ms' },
  { label: 'Frame skip', value: 'Off' },
];

const ARGS: Partial<StackArgs> = { gap: 'md', align: 'stretch' };

const ARG_TYPES: StoryLiteArgTypes<StackArgs> = {
    gap: { control: 'select', options: [...GAPS] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
  };

const meta = {
  title: 'Primitives · Layout/Stack',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StackArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Stack gap={args.gap} align={args.align}>
      <Text variant="title">Video</Text>
      <StatRow label="Display scale" value="3x" />
      <StatRow label="Aspect ratio" value="4:3" />
      <StatRow label="Audio latency" value="64 ms" />
      <StatRow label="Frame skip" value="Off" />
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<StackArgs>;

const GapScale = {
  name: 'Gap scale',
  render: () => (
    <Demonstrator
      columns={axis(GAPS)}
      align="start"
      cell={(_row, gap) => (
        <Stack gap={gap}>
          {SETTINGS.slice(0, 3).map((setting) => (
            <Text key={setting.label} variant="subtitle">{setting.label}</Text>
          ))}
        </Stack>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StackArgs>;

const Overview = overviewStory({
  component: 'Stack',
  description: 'A column of children with even space between them. Reach for it to lay out a form, a panel or a list of rows without writing margins. Gap takes a space token and defaults to md, and align sets how the children sit across the column. It is a Flex fixed to the column direction, so it takes every other Flex prop.',
  playground: Playground,
  variants: [GapScale],
});

export default meta;
export { GapScale, Overview, Playground };
