/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Flex, Spacer, Text } from '../../src/primitives';
import type { SpaceToken } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import '../_template/story-outline.css';
import './Spacer.stories.css';

type SpacerSize = SpaceToken | 'flexible';

type SpacerArgs = {
  size: SpacerSize;
  direction: 'row' | 'column';
};

const SIZES: readonly SpaceToken[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const ARGS: Partial<SpacerArgs> = { size: 'flexible', direction: 'row' };

const ARG_TYPES: PlaygroundArgTypes<SpacerArgs> = {
    size: { group: 'Layout', control: 'select', options: ['flexible', ...SIZES] },
    direction: { group: 'Layout', control: 'select', options: ['row', 'column'] },
  };

const meta = {
  title: 'Primitives · Layout/Spacer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SpacerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Flex className="story-outline story-frame" direction={args.direction} align="start">
      <Box className="spacer-demo__block">Before</Box>
      <Spacer size={args.size === 'flexible' ? undefined : args.size} />
      <Box className="spacer-demo__block">After</Box>
    </Flex>
  ),
} satisfies PlaygroundStory<SpacerArgs>;

const FixedSizes = {
  name: 'Fixed sizes',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <Flex align="center">
          <Box className="spacer-demo__block">A</Box>
          <Spacer size={size} />
          <Box className="spacer-demo__block">B</Box>
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<SpacerArgs>;

const Toolbar = {
  name: 'Flexible filler in a toolbar',
  render: () => (
    <Flex className="story-outline" align="center" gap="sm">
      <Text variant="title">Save states</Text>
      <Text variant="caption">12 files</Text>
      <Spacer />
      <Button size="sm" variant="ghost">Import</Button>
      <Button size="sm" variant="primary">New save</Button>
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<SpacerArgs>;

const CODE = `import { Button, Flex, Spacer, Text } from '@drizztdourden08/tessera';

<Flex align="center" gap="sm">
  <Text variant="title">Save states</Text>
  <Spacer />
  <Button size="sm">New save</Button>
</Flex>`;

const Overview = overviewStory({
  component: 'Spacer',
  description: 'An empty block that makes room between siblings in a flex container. Given a spacing token as its size, it is a fixed gap of that size. Left without one, it grows to take the free space and pushes its siblings apart, as in a toolbar with its actions on the right.',
  playground: Playground,
  variants: [FixedSizes, Toolbar],
  code: CODE,
});

export default meta;
export { FixedSizes, Overview, Playground, Toolbar };
