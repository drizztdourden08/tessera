/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Spinner, Text } from '../../src/primitives';
import type { SpinnerProps } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type SpinnerSize = NonNullable<SpinnerProps['size']>;

type SpinnerArgs = {
  size: SpinnerSize;
};

const SIZES: readonly SpinnerSize[] = ['sm', 'md', 'lg'];

const ARGS: Partial<SpinnerArgs> = { size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<SpinnerArgs> = {
    size: { control: 'select', options: [...SIZES] },
  };

const meta = {
  title: 'Primitives · Feedback/Spinner',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SpinnerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Spinner size={args.size} />,
} satisfies StoryLiteStoryDefinition<SpinnerArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Box className="story-row">
      {SIZES.map((size) => (
        <Box key={size} className="story-row">
          <Spinner size={size} />
          <Text className="story-label">{size}</Text>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SpinnerArgs>;

const InContext = {
  name: 'Beside a status line',
  render: () => (
    <Box className="story-column">
      <Box className="story-row">
        <Spinner size="sm" />
        <Text>Connecting to the multiworld server...</Text>
      </Box>
      <Box className="story-row">
        <Spinner size="md" />
        <Text>Extracting assets from the ROM...</Text>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SpinnerArgs>;

const Overview = overviewStory({
  component: 'Spinner',
  description: 'A small turning ring for work of unknown length, like connecting to a server or reading a file. Put it beside a line that says what is happening. It comes in three sizes and carries a status role labelled Loading for screen readers.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { InContext, Overview, Playground, Sizes };
