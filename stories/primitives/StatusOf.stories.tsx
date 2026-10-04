/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Flex, StatusOf } from '../../src/primitives';
import type { StatusKey, StatusVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ENGINE_STATES, PLAYER_STATUSES, SESSION_STATUSES } from './_samples/status-tables.constants';

type SessionKey = StatusKey<typeof SESSION_STATUSES>;

type StatusOfArgs = {
  value: SessionKey;
  variant: StatusVariant;
  dot: boolean;
};

const SESSION_KEYS = Object.keys(SESSION_STATUSES) as SessionKey[];

const ENGINE_KEYS = Object.keys(ENGINE_STATES) as StatusKey<typeof ENGINE_STATES>[];

const ARGS: Partial<StatusOfArgs> = { value: 'hosting', variant: 'pill', dot: true };

const ARG_TYPES: PlaygroundArgTypes<StatusOfArgs> = {
  value: { group: 'Content', control: 'select', options: SESSION_KEYS, description: 'The key to draw, from the session table.' },
  variant: { group: 'Appearance', control: 'select', options: ['text', 'pill'] },
  dot: { group: 'Appearance', control: 'boolean', description: 'A dot before the label, when the entry has no icon.' },
};

const meta = {
  title: 'Primitives · Display/StatusOf',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StatusOfArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatusOf map={SESSION_STATUSES} value={args.value} variant={args.variant} dot={args.dot} />,
} satisfies PlaygroundStory<StatusOfArgs>;

const OneTable = {
  name: 'One table, two looks',
  render: () => (
    <Demonstrator
      corner="Session"
      rows={axis(SESSION_KEYS)}
      columns={axis(['text', 'pill'] as const)}
      cell={(key, variant) => <StatusOf map={SESSION_STATUSES} value={key} variant={variant} dot={variant === 'text'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatusOfArgs>;

const WithIcons = {
  name: 'Entries with icons',
  render: () => (
    <Flex gap="md" align="center" wrap>
      {ENGINE_KEYS.map((key) => <StatusOf key={key} map={ENGINE_STATES} value={key} />)}
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StatusOfArgs>;

const Fallback = {
  name: 'A value not known yet',
  render: () => (
    <Flex gap="md" align="center" wrap>
      <StatusOf map={ENGINE_STATES} value={undefined} fallback="unknown" />
      <StatusOf map={PLAYER_STATUSES} value="goal" variant="pill" />
      <StatusOf map={PLAYER_STATUSES} value="offline" variant="pill" dot />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StatusOfArgs>;

const CODE = `import { defineStatuses, StatusOf } from '@drizztdourden08/tessera';

const SESSION_STATUSES = defineStatuses({
  draft: { label: 'Draft', tone: 'neutral' },
  generating: { label: 'Generating', tone: 'warning', pulse: true },
  hosting: { label: 'Hosting', tone: 'success' },
  failed: { label: 'Failed', tone: 'danger' },
});

<StatusOf map={SESSION_STATUSES} value={session.status} variant="pill" />`;

const Overview = overviewStory({
  component: 'StatusOf',
  description: 'Draws one state from a table of states declared once, so a state reads the same on every screen.',
  points: [
    '`defineStatuses` declares each key with its `label`, `tone`, and an optional `pulse` and `icon`.',
    '`value` must be a key of the table, so a missing or misspelt state fails the type check.',
    '`fallback` names the key to draw while the value is still unknown.',
    'Every other prop goes to [Status], such as `variant` and `dot`; an icon takes the place of the dot.',
  ],
  instead: '[Status] for a single state that has no table behind it.',
  playground: Playground,
  variants: [OneTable, WithIcons, Fallback],
  code: CODE,
});

export default meta;
export { Fallback, OneTable, Overview, Playground, WithIcons };
