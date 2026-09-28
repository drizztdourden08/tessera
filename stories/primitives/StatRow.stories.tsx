/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Badge, Box, Card, Stack, StatRow, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type StatRowArgs = {
  label: string;
  value: string;
  mono: boolean;
};

const ARGS: Partial<StatRowArgs> = { label: 'Seed', value: '48213-HOOK-VALE', mono: true };

const ARG_TYPES: StoryLiteArgTypes<StatRowArgs> = {
    label: { control: 'text' },
    value: { control: 'text' },
    mono: { control: 'boolean' },
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
} satisfies StoryLiteStoryDefinition<StatRowArgs>;

const SessionDetails = {
  name: 'Session details',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="xs">
          <Text variant="title">Session</Text>
          <StatRow label="Host" value="archipelago.local:38281" mono />
          <StatRow label="Seed" value="48213-HOOK-VALE" mono />
          <StatRow label="Players" value="4 of 6" />
          <StatRow label="Checks" value="212 / 640" />
          <StatRow label="Status" value={<Badge variant="success">Connected</Badge>} />
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

const Overview = overviewStory({
  component: 'StatRow',
  description: 'One line of a readout: a label on the left and its value on the right. Stack a few of them in a card for session details, stats or settings at a glance. The value can be text or any node, such as a badge. Set mono for addresses, ids and coordinates, so the value draws in a monospace font.',
  playground: Playground,
  variants: [SessionDetails],
});

export default meta;
export { Overview, Playground, SessionDetails };
