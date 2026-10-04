/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Card, Flex, Stack, Status, Text } from '../../src/primitives';
import type { StatusTone, StatusVariant } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

type StatusArgs = {
  label: string;
  tone: StatusTone;
  variant: StatusVariant;
  dot: boolean;
  pulse: boolean;
};

const TONES: readonly StatusTone[] = ['neutral', 'success', 'warning', 'danger', 'info', 'primary', 'secondary', 'tertiary'];

const LOOKS = ['text', 'text with dot', 'pill', 'pill with dot'] as const;

const LABELS: Record<StatusTone, string> = {
  neutral: 'Spectating',
  success: 'Connected',
  warning: 'Syncing',
  danger: 'Disconnected',
  info: 'Dev build',
  primary: 'Featured',
  secondary: 'Verified',
  tertiary: 'Archived',
};

const SCREENS: readonly { id: string; status: string; tone: StatusTone }[] = [
  { id: 'ow-0x00', status: 'Verified', tone: 'success' },
  { id: 'ow-0x18', status: 'Mapped', tone: 'info' },
  { id: 'hc-0x80', status: 'Draft', tone: 'warning' },
  { id: 'cave-0x1e', status: 'Unsaved', tone: 'neutral' },
];

const ARGS: Partial<StatusArgs> = { label: 'Connected', tone: 'success', variant: 'text', dot: false, pulse: false };

const ARG_TYPES: PlaygroundArgTypes<StatusArgs> = {
  label: { group: 'Content', control: 'text' },
  tone: { group: 'Appearance', control: 'select', options: [...TONES] },
  variant: { group: 'Appearance', control: 'select', options: ['text', 'pill'] },
  dot: { group: 'Appearance', control: 'boolean', description: 'Leads the word with a dot in its tone.' },
  pulse: { group: 'Motion', control: 'boolean', description: 'Fades in and out, for a state that is still changing. With a dot, only the dot fades.' },
};

const meta = {
  title: 'Primitives · Display/Status',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StatusArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Status tone={args.tone} variant={args.variant} dot={args.dot} pulse={args.pulse}>{args.label}</Status>
  ),
} satisfies PlaygroundStory<StatusArgs>;

const Tones = {
  name: 'Every tone and look',
  render: () => (
    <Demonstrator
      rows={axis(TONES)}
      columns={axis(LOOKS)}
      cell={(tone, look) => (
        <Status tone={tone} variant={look.startsWith('pill') ? 'pill' : 'text'} dot={look.endsWith('dot')}>{LABELS[tone]}</Status>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatusArgs>;

const Pulsing = {
  name: 'Pulsing',
  render: () => (
    <Flex gap="md" align="center" wrap>
      <Status tone="warning" pulse>Syncing</Status>
      <Status tone="warning" dot pulse>Syncing</Status>
      <Status tone="success" variant="pill" dot pulse>Live</Status>
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StatusArgs>;

const ScreenList = {
  name: 'Screens by status',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="sm">
          {SCREENS.map((screen) => (
            <Flex key={screen.id} justify="between" align="center">
              <Text>{screen.id}</Text>
              <Status tone={screen.tone} variant="pill">{screen.status}</Status>
            </Flex>
          ))}
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<StatusArgs>;

const Overview = overviewStory({
  component: 'Status',
  description: 'A read-only word that says what state something is in: connected, syncing, draft, verified. text draws the word in its tone, beside a name or in a table cell; pill draws it in capitals on a filled pill, for a record header or a list of screens. The tone carries the meaning: neutral, the default, the four urgencies and the three theme colours. dot leads the word with a dot in the same tone, and pulse fades it in and out for a state that is still changing, only the dot when there is one. The caller passes the word, so the same tone serves any label.',
  playground: Playground,
  variants: [Tones, Pulsing, ScreenList],
});

export default meta;
export { Overview, Playground, Pulsing, ScreenList, Tones };
