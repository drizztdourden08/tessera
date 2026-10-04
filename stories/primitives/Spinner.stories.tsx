/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
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

const ARG_TYPES: PlaygroundArgTypes<SpinnerArgs> = {
    label: { group: 'Content', control: 'text', description: 'What a screen reader announces.' },
    size: { group: 'Appearance', control: 'select', options: [...SIZES] },
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
} satisfies PlaygroundStory<SpinnerArgs>;

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
  description: 'A small turning ring for work of unknown length, such as connecting to a server or reading a file.',
  points: [
    'Put it beside a line that says what is happening.',
    'It comes in three sizes and screen readers announce it as Loading, or as the `label` you give it.',
    '[Button], [Select], [Video] and others draw it too, and [TesseraProvider] swaps it everywhere at once.',
    'With reduced motion it stops turning and fades in and out.',
  ],
  instead: '[ProgressBar] when you know how much is done.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { InContext, Overview, Playground, Sizes };
