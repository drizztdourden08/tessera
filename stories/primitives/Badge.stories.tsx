/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Badge, Box, Card, Flex, Glyph, Stack, Text } from '../../src/primitives';
import type { BadgeVariant } from '../../src/primitives/Badge/Badge.type';
import { LabelledRows } from '../_template/LabelledRows';
import { overviewStory } from '../_template/overview-story';

type BadgeArgs = {
  label: string;
  variant: BadgeVariant;
  withIcon: boolean;
  pulse: boolean;
};

const VARIANTS: readonly BadgeVariant[] = ['success', 'warning', 'danger', 'neutral'];

const LABELS: Record<BadgeVariant, string> = {
  success: 'Connected',
  warning: 'Syncing',
  danger: 'Disconnected',
  neutral: 'Spectating',
};

const PLAYERS: readonly { name: string; game: string; variant: BadgeVariant }[] = [
  { name: 'Aria', game: 'Lost Woods run', variant: 'success' },
  { name: 'Brom', game: 'Desert run', variant: 'warning' },
  { name: 'Cadence', game: 'Mountain run', variant: 'danger' },
  { name: 'Dov', game: 'Watching', variant: 'neutral' },
];

const ARGS: Partial<BadgeArgs> = { label: 'Connected', variant: 'success', withIcon: false, pulse: false };

const ARG_TYPES: StoryLiteArgTypes<BadgeArgs> = {
    label: { control: 'text' },
    variant: { control: 'select', options: [...VARIANTS] },
    withIcon: { control: 'boolean' },
    pulse: { control: 'boolean', description: 'Fades in and out, to draw the eye to a status that is still changing.' },
  };

const meta = {
  title: 'Primitives · Display/Badge',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BadgeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Badge variant={args.variant} pulse={args.pulse}>
      {args.withIcon && <Glyph name="check" />}
      {args.label}
    </Badge>
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <LabelledRows items={VARIANTS} render={(variant) => <Badge variant={variant}>{LABELS[variant]}</Badge>} />
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Pulsing = {
  name: 'Pulsing',
  render: () => (
    <LabelledRows items={VARIANTS} render={(variant) => <Badge variant={variant} pulse>{LABELS[variant]}</Badge>} />
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const PlayerList = {
  name: 'Player list',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="sm">
          {PLAYERS.map((player) => (
            <Flex key={player.name} justify="between" align="center" gap="md">
              <Box>
                <Text as="div">{player.name}</Text>
                <Text variant="caption">{player.game}</Text>
              </Box>
              <Badge variant={player.variant} pulse={player.variant === 'warning'}>{LABELS[player.variant]}</Badge>
            </Flex>
          ))}
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Overview = overviewStory({
  component: 'Badge',
  description: 'A small pill that names a status next to a name or a row: connected, syncing, disconnected, watching. Four tones carry the meaning: success, warning, danger, and neutral, the default. pulse fades it in and out, for a status that is still changing or wants a look, such as syncing or an update waiting. It takes any content, so an icon can sit before the label, and extra classes give it a surface of its own.',
  playground: Playground,
  variants: [AllVariants, Pulsing],
});

export default meta;
export { AllVariants, Overview, Playground, PlayerList, Pulsing };
