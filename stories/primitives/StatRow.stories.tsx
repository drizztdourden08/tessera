/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Card, Stack, StatRow, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type StatRowArgs = {
  label: string;
  value: string;
  mono: boolean;
};

const ARGS: Partial<StatRowArgs> = { label: 'Seed', value: '48213-HOOK-VALE', mono: true };

const ARG_TYPES: PlaygroundArgTypes<StatRowArgs> = {
    label: { group: 'Content', control: 'text' },
    value: { group: 'Content', control: 'text' },
    mono: { group: 'Appearance', control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Display/StatRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StatRowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatRow label={args.label} value={args.value} mono={args.mono} />,
} satisfies PlaygroundStory<StatRowArgs>;

const SessionDetails = {
  name: 'Session details',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="xs">
          <Text variant="title">Session</Text>
          <StatRow label="Host" value="archipelago.local:38281" mono copyable />
          <StatRow label="Seed" value="48213-HOOK-VALE" mono copyable />
          <StatRow label="Players" value="4 of 6" />
          <StatRow label="Checks" value="212 / 640" />
          <StatRow label="Status" value={<Status tone="success">Connected</Status>} />
          <StatRow label="Room" value="0x0012" mono />
          <StatRow
            label="Goal"
            value="Collect every crystal, then reach the top of the tower in the center of the world"
          />
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<StatRowArgs>;

const WidePage = {
  name: 'On a wide page',
  render: () => (
    <Stack gap="xs">
      <Text variant="title">Engine</Text>
      <StatRow label="Archipelago" value="0.6.7" />
      <StatRow label="Folder" value="X:\archipelia\.user-data\Data\engine\0.6.7-win32-x64" mono />
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<StatRowArgs>;

const Overview = overviewStory({
  component: 'StatRow',
  description: 'One line of a readout, with a label on the left and its value on the right.',
  points: [
    'Stack a few in a [Card] for session details, stats or settings at a glance.',
    '`value` can be text or any node, such as a [Status].',
    '`mono` draws the value in a monospace font, for addresses, ids and coordinates.',
    'The value can be selected; `copyable` adds a button that copies it, or the string it is given.',
    'A row stops at 512 px, so on a wide page the value stays near its label.',
  ],
  instead: '[TermList] for terms and what they mean.',
  playground: Playground,
  variants: [SessionDetails, WidePage],
});

export default meta;
export { Overview, Playground, SessionDetails, WidePage };
