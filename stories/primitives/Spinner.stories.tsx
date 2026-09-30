/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Spinner, Text } from '../../src/primitives';
import type { SpinnerSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type SpinnerArgs = {
  size: SpinnerSize;
  label: string;
};

const SIZES: readonly SpinnerSize[] = ['sm', 'md', 'lg'];

const ARGS: Partial<SpinnerArgs> = { size: 'md', label: 'Loading' };

const ARG_TYPES: StoryLiteArgTypes<SpinnerArgs> = {
    size: { control: 'select', options: [...SIZES] },
    label: { control: 'text', description: 'What a screen reader announces.' },
  };

const meta = {
  title: 'Primitives · Feedback/Spinner',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SpinnerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Spinner size={args.size} label={args.label} />,
} satisfies StoryLiteStoryDefinition<SpinnerArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator columns={axis(SIZES)} cell={(_row, size) => <Spinner size={size} />} />
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
  description: 'A small turning ring for work of unknown length, like connecting to a server or reading a file. Put it beside a line that says what is happening. It comes in three sizes and carries a status role labelled Loading for screen readers, or the label you give it. It is the one spinner in Tessera: Button, IconButton, Select, Combobox and Video draw it too, and an app swaps it everywhere at once through TesseraProvider. With reduced motion it stops turning and fades in and out.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { InContext, Overview, Playground, Sizes };
