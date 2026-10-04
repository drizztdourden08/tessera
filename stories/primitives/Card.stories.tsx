/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, ButtonRow, Card, Flex, Stack, Status, Text } from '../../src/primitives';
import type { CardProps } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
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

const ARG_TYPES: PlaygroundArgTypes<CardArgs> = {
    title: { group: 'Content', control: 'text' },
    body: { group: 'Content', control: 'textarea' },
    variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
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
} satisfies PlaygroundStory<CardArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis(VARIANTS)}
      align="stretch"
      cell={(variant) => (
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
      )}
    />
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
  description: 'A bordered surface that groups related content, such as a summary, a list entry or a settings block.',
  points: [
    '`default` is the plain panel; `danger` frames a destructive choice.',
    '`interactive` is for a card clicked as a whole: it lights its border on hover and shows a focus ring.',
    '**An interactive card needs a `tabIndex` and a `role`** when it acts as a button.',
    'It sets no inner layout: put a [Stack] or [Flex] inside.',
  ],
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
