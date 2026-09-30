/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, ButtonRow, Card, Flex, Stack, Status, Text } from '../../src/primitives';
import type { CardProps } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';

type CardVariant = NonNullable<CardProps['variant']>;

type CardArgs = {
  variant: CardVariant;
  title: string;
  body: string;
};

const VARIANTS: readonly CardVariant[] = ['default', 'interactive', 'danger'];

const SAMPLES: Record<CardVariant, { title: string; body: string }> = {
  default: { title: 'Session summary', body: 'Four players, 212 of 640 checks found.' },
  interactive: { title: 'Saturday multiworld', body: 'Click to open the session.' },
  danger: { title: 'Delete profile', body: 'Removes every save state and setting in this profile.' },
};

const SESSIONS = [
  { id: 'sat', name: 'Saturday multiworld', players: 4, status: 'Running' },
  { id: 'relay', name: 'Relay practice', players: 2, status: 'Paused' },
  { id: 'solo', name: 'Solo seed 48213', players: 1, status: 'Finished' },
];

const ARGS: Partial<CardArgs> = { variant: 'default', ...SAMPLES.default };

const ARG_TYPES: StoryLiteArgTypes<CardArgs> = {
    variant: { control: 'select', options: [...VARIANTS] },
    title: { control: 'text' },
    body: { control: 'textarea' },
  };

const meta = {
  title: 'Primitives · Layout/Card',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CardArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Card variant={args.variant}>
      <Stack gap="xs">
        <Text variant="title">{args.title}</Text>
        <Text variant="subtitle">{args.body}</Text>
      </Stack>
    </Card>
  ),
} satisfies StoryLiteStoryDefinition<CardArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Box className="story-column">
      {VARIANTS.map((variant) => (
        <Stack key={variant} gap="xs">
          <Text className="story-label">{variant}</Text>
          <Card variant={variant}>
            <Stack gap="sm">
              <Text variant="title">{SAMPLES[variant].title}</Text>
              <Text variant="subtitle">{SAMPLES[variant].body}</Text>
              {variant === 'danger' && (
                <ButtonRow>
                  <Button size="sm" variant="ghost">Cancel</Button>
                  <Button size="sm" variant="danger">Delete profile</Button>
                </ButtonRow>
              )}
            </Stack>
          </Card>
        </Stack>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CardArgs>;

const SessionPickerDemo = () => {
  const [picked, setPicked] = useState<string | null>(null);
  const current = SESSIONS.find((session) => session.id === picked);

  return (
    <Box className="story-column">
      {SESSIONS.map((session) => (
        <Card key={session.id} variant="interactive" onClick={() => setPicked(session.id)}>
          <Flex justify="between" align="center" gap="md">
            <Box>
              <Text as="div">{session.name}</Text>
              <Text variant="caption">{`${session.players} players`}</Text>
            </Box>
            <Status tone={session.status === 'Running' ? 'success' : 'neutral'}>{session.status}</Status>
          </Flex>
        </Card>
      ))}
      <Text variant="caption">{current ? `Opened: ${current.name}` : 'Pick a session.'}</Text>
    </Box>
  );
};

const Interactive = {
  name: 'Interactive list',
  render: () => <SessionPickerDemo />,
} satisfies StoryLiteStoryDefinition<CardArgs>;

const renderState = () => (
  <Card variant="interactive" tabIndex={0}>
    <Stack gap="xs">
      <Text variant="title">{SAMPLES.interactive.title}</Text>
      <Text variant="subtitle">{SAMPLES.interactive.body}</Text>
    </Stack>
  </Card>
);

const Overview = overviewStory({
  component: 'Card',
  description: 'A bordered surface that groups related content: a summary, a list entry, a settings block. Default is the plain panel. Interactive is for a card clicked as a whole: it shows a pointer, lights its border on hover and draws a focus ring when it takes keyboard focus, so give it a tabIndex and a role when it acts as a button. Danger frames a destructive choice in the danger colour. It sets no inner layout, so a Stack or Flex inside arranges the content, and every div prop, click handlers included, passes through.',
  playground: Playground,
  variants: [AllVariants],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
    ],
  },
});

export default meta;
export { AllVariants, Interactive, Overview, Playground };
