/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Card, Flex, Stack, Status, Text } from '../../src/primitives';
import type { StatusKey, StatusTone, StatusVariant } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { StatusPalettes } from './_samples/StatusPalettes';
import { ENGINE_STATES, PLAYER_STATUSES, SESSION_STATUSES } from './_samples/status-tables.constants';

type SessionKey = StatusKey<typeof SESSION_STATUSES>;

type StatusArgs = {
  label: string;
  tone: StatusTone;
  variant: StatusVariant;
  dot: boolean;
  pulse: boolean;
  source: 'word' | 'map';
  value: SessionKey;
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

const SESSION_KEYS = Object.keys(SESSION_STATUSES) as SessionKey[];

const ENGINE_KEYS = Object.keys(ENGINE_STATES) as StatusKey<typeof ENGINE_STATES>[];

const ARGS: Partial<StatusArgs> = { label: 'Connected', tone: 'success', variant: 'text', dot: false, pulse: false, source: 'word', value: 'hosting' };

const ARG_TYPES: PlaygroundArgTypes<StatusArgs> = {
  source: { group: 'Content', control: 'select', options: ['word', 'map'], description: 'A word with its tone, or a key of a table declared with defineStatuses.' },
  label: { group: 'Content', control: 'text' },
  value: { group: 'Content', control: 'select', options: SESSION_KEYS, description: 'With map: the key to draw, from the session table.' },
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
  render: (args) => (args.source === 'map'
    ? <Status map={SESSION_STATUSES} value={args.value} variant={args.variant} dot={args.dot} />
    : <Status tone={args.tone} variant={args.variant} dot={args.dot} pulse={args.pulse}>{args.label}</Status>),
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

const EveryPalette = {
  name: 'Status tones in every palette',
  render: () => <StatusPalettes />,
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

const OneTable = {
  name: 'One table, two looks',
  render: () => (
    <Demonstrator
      corner="Session"
      rows={axis(SESSION_KEYS)}
      columns={axis(['text', 'pill'] as const)}
      cell={(key, variant) => <Status map={SESSION_STATUSES} value={key} variant={variant} dot={variant === 'text'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatusArgs>;

const WithIcons = {
  name: 'Table entries with icons',
  render: () => (
    <Flex gap="md" align="center" wrap>
      {ENGINE_KEYS.map((key) => <Status key={key} map={ENGINE_STATES} value={key} />)}
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StatusArgs>;

const Fallback = {
  name: 'A value not known yet',
  render: () => (
    <Flex gap="md" align="center" wrap>
      <Status map={ENGINE_STATES} value={undefined} fallback="unknown" />
      <Status map={PLAYER_STATUSES} value="goal" variant="pill" />
      <Status map={PLAYER_STATUSES} value="offline" variant="pill" dot />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StatusArgs>;

const Overview = overviewStory({
  component: 'Status',
  description: 'A read-only word that says what state something is in, such as connected, syncing or draft.',
  points: [
    '`text` draws the word in its tone; `pill` draws it in capitals on a filled pill, for a record header.',
    'Pass the word as children with its `tone`, `neutral` by default, and `pulse` for a state still changing.',
    'Or pass `map`, a table from `defineStatuses`, and `value`, one of its keys: the table gives the word and tone.',
    '`fallback` names the key drawn while `value` is missing or not in the table.',
    '`dot` leads the word with a dot; a table entry with an `icon` draws the icon there instead.',
  ],
  instead: '[Badge] for a count, or [Tag] for a value that sorts an item into a group.',
  playground: Playground,
  variants: [Tones, EveryPalette, Pulsing, ScreenList, OneTable, WithIcons, Fallback],
});

export default meta;
export { EveryPalette, Fallback, OneTable, Overview, Playground, Pulsing, ScreenList, Tones, WithIcons };
