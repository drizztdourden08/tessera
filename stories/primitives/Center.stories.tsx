/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Center, Flex, Text } from '../../src/primitives';
import type { SpaceToken } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Center.stories.css';

type CenterArgs = {
  direction: 'row' | 'column';
  gap: SpaceToken;
  message: string;
};

const PLAYERS = [
  { initials: 'AR', name: 'Aria', game: 'Lost Woods run' },
  { initials: 'BR', name: 'Brom', game: 'Desert run' },
  { initials: 'CA', name: 'Cadence', game: 'Mountain run' },
];

const ARGS: Partial<CenterArgs> = { direction: 'column', gap: 'sm', message: 'Waiting for the host to start the session' };

const ARG_TYPES: PlaygroundArgTypes<CenterArgs> = {
    message: { group: 'Content', control: 'text' },
    direction: { group: 'Layout', control: 'select', options: ['row', 'column'] },
    gap: { group: 'Layout', control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
  };

const meta = {
  title: 'Primitives · Layout/Center',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CenterArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Center className="center-demo" direction={args.direction} gap={args.gap}>
      <Text variant="title">Lobby</Text>
      <Text variant="subtitle">{args.message}</Text>
    </Center>
  ),
} satisfies PlaygroundStory<CenterArgs>;

const InlineAvatars = {
  name: 'Inline avatars',
  render: () => (
    <Box className="story-column">
      {PLAYERS.map((player) => (
        <Flex key={player.name} gap="sm" align="center">
          <Center inline className="center-demo__avatar">{player.initials}</Center>
          <Box>
            <Text as="div">{player.name}</Text>
            <Text variant="caption">{player.game}</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CenterArgs>;

const Overview = overviewStory({
  component: 'Center',
  description: 'Puts its children in the middle on both axes, such as a waiting message in an empty pane.',
  points: [
    'It is a [Flex] with `align` and `justify` fixed to center, so every other Flex prop still applies.',
    '`inline` makes it sit in a line of text, sized to its content.',
    'Use it for initials in an avatar, an icon in a tile or a message in an empty area.',
  ],
  playground: Playground,
  variants: [InlineAvatars],
});

export default meta;
export { InlineAvatars, Overview, Playground };
