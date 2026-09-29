/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Card, Flex, Stack, StatusBadge, Text } from '../../src/primitives';
import type { ScreenStatus } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { axis, VariantGrid } from '../_template/VariantGrid';

type StatusChoice = 'unsaved' | NonNullable<ScreenStatus>;

type StatusBadgeArgs = {
  status: StatusChoice;
  interactive: boolean;
};

const CHOICES: readonly StatusChoice[] = ['unsaved', 'draft', 'mapped', 'verified'];

const toStatus = (choice: StatusChoice): ScreenStatus => (choice === 'unsaved' ? undefined : choice);

const SCREENS: readonly { id: string; status: ScreenStatus }[] = [
  { id: 'ow-0x00', status: 'verified' },
  { id: 'ow-0x18', status: 'mapped' },
  { id: 'hc-0x80', status: 'draft' },
  { id: 'cave-0x1e', status: undefined },
];

const ARGS: Partial<StatusBadgeArgs> = { status: 'draft', interactive: false };

const ARG_TYPES: StoryLiteArgTypes<StatusBadgeArgs> = {
    status: { control: 'select', options: [...CHOICES] },
    interactive: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Display/StatusBadge',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StatusBadgeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatusBadge status={toStatus(args.status)} interactive={args.interactive} />,
} satisfies StoryLiteStoryDefinition<StatusBadgeArgs>;

const LOOKS = ['default', 'custom labels', 'interactive'] as const;

const CUSTOM_LABELS = { unsaved: 'New', draft: 'In progress', mapped: 'Charted', verified: 'Checked' };

const AllStatuses = {
  name: 'All statuses',
  render: () => (
    <VariantGrid
      rows={axis(CHOICES)}
      columns={axis(LOOKS)}
      cell={(choice, look) => (
        <StatusBadge
          status={toStatus(choice)}
          labels={look === 'custom labels' ? CUSTOM_LABELS : undefined}
          interactive={look === 'interactive'}
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatusBadgeArgs>;

const CyclingDemo = () => {
  const [statuses, setStatuses] = useState<Record<string, ScreenStatus>>(
    () => Object.fromEntries(SCREENS.map((screen) => [screen.id, screen.status])),
  );

  return (
    <Box className="story-column">
      <Text variant="subtitle">Click a badge to move the screen to its next status.</Text>
      <Card>
        <Stack gap="sm">
          {SCREENS.map((screen) => (
            <Flex key={screen.id} justify="between" align="center">
              <Text>{screen.id}</Text>
              <StatusBadge
                status={statuses[screen.id]}
                interactive
                onChange={(next) => setStatuses((current) => ({ ...current, [screen.id]: next }))}
              />
            </Flex>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

const Cycling = {
  name: 'Click to cycle',
  render: () => <CyclingDemo />,
} satisfies StoryLiteStoryDefinition<StatusBadgeArgs>;

const Overview = overviewStory({
  component: 'StatusBadge',
  description: 'A small pill that names where a record stands: unsaved, draft, mapped or verified. Use it beside an item in a list or a header so its progress reads at a glance. Each status has its own colour and a default label, and the caller can pass its own labels. Set interactive with onChange and a click moves the badge to the next status in the cycle. An interactive badge fades a little on hover.',
  playground: Playground,
  variants: [AllStatuses],
  states: {
    render: () => <StatusBadge status="draft" interactive />,
    list: [
      STATE.idle,
      STATE.hover,
    ],
  },
});

export default meta;
export { AllStatuses, Cycling, Overview, Playground };
