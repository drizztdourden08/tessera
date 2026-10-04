/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, ButtonRow, Card, Flex, Stack, Status, Text } from '../../src/primitives';
import type { CardProps, CardTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { PageWithCards, toneCard, TONES } from './_samples/card-headers';

type CardVariant = NonNullable<CardProps['variant']>;

type CardArgs = {
  variant: CardVariant;
  header: boolean;
  title: string;
  subtitle: string;
  count: number;
  tone: CardTone;
  actions: boolean;
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

const ARGS: Partial<CardArgs> = { variant: 'default', header: true, subtitle: '', count: 4, tone: 'neutral', actions: true, ...SAMPLES.default };

const ARG_TYPES: PlaygroundArgTypes<CardArgs> = {
    header: { group: 'Content', control: 'boolean', description: 'Draws the title as a header row; off, the title sits in the body.' },
    title: { group: 'Content', control: 'text' },
    subtitle: { group: 'Content', control: 'text', description: 'Under the title in the header. Leave empty to hide.' },
    count: { group: 'Content', control: 'number', min: -1, max: 120, step: 1, description: 'A Badge after the title; below 0 shows none.' },
    actions: { group: 'Content', control: 'boolean', description: 'A button at the end of the header.' },
    body: { group: 'Content', control: 'textarea' },
    variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
    tone: { group: 'Appearance', control: 'select', options: [...TONES], description: 'Tints the header row.' },
  };

const headerOf = (args: CardArgs): Partial<CardProps> => (args.header ? {
  title: args.title,
  subtitle: args.subtitle || undefined,
  count: args.count >= 0 ? args.count : undefined,
  tone: args.tone,
  actions: args.actions ? <Button size="sm" variant="secondary">Open</Button> : undefined,
} : {});

const meta = {
  title: 'Primitives · Layout/Card',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CardArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Card variant={args.variant} {...headerOf(args)}>
        <Stack gap="xs">
          {!args.header && <Text variant="title">{args.title}</Text>}
          <Text variant="subtitle">{args.body}</Text>
        </Stack>
      </Card>
    </Box>
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

const HeaderTones = {
  name: 'Header tones',
  render: () => <Demonstrator rows={axis(TONES)} align="stretch" cell={toneCard} />,
} satisfies StoryLiteStoryDefinition<CardArgs>;

const OnAPage = {
  name: 'Under a ContentHeader and a SectionHeader',
  render: () => <PageWithCards />,
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
    '`title` draws a header row in the [SectionHeader] look, with `subtitle`, `count` and `actions`.',
    '`tone` tints the header row, such as `warning` for a card of problems.',
    '`interactive` is for a card clicked as a whole: it lights its border on hover and shows a focus ring.',
    '**An interactive card needs a `tabIndex` and a `role`** when it acts as a button.',
    'It sets no inner layout: put a [Stack] or [Flex] inside.',
  ],
  instead: '[ContentHeader] for the header of a whole page, or [SectionHeader] for a heading outside a card.',
  playground: Playground,
  variants: [AllVariants, HeaderTones, OnAPage],
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
export { AllVariants, HeaderTones, Interactive, OnAPage, Overview, Playground };
