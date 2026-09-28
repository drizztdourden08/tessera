/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Badge, Box, Button, Text, Tooltip } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type Placement = 'top' | 'bottom';

type TooltipArgs = {
  content: string;
  placement: Placement;
  trigger: string;
};

const ARGS: Partial<TooltipArgs> = { content: 'Costs 25% of your rupees', placement: 'top', trigger: 'Buy a hint' };

const ARG_TYPES: StoryLiteArgTypes<TooltipArgs> = {
    content: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom'] },
    trigger: { control: 'text' },
  };

const meta = {
  title: 'Primitives · Feedback/Tooltip',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TooltipArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Tooltip content={args.content} placement={args.placement}>
      <Button variant="secondary">{args.trigger}</Button>
    </Tooltip>
  ),
} satisfies StoryLiteStoryDefinition<TooltipArgs>;

const Placements = {
  name: 'Placements and triggers',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Point at each item</Text>
      <Box className="story-row">
        <Tooltip content="Opens above" placement="top">
          <Button variant="secondary">Top</Button>
        </Tooltip>
        <Tooltip content="Opens below" placement="bottom">
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip content="Three players are connected">
          <Badge>3 online</Badge>
        </Tooltip>
        <Tooltip content="Seed 48213, generated on this machine">
          <Text>Seed info</Text>
        </Tooltip>
        <Tooltip content={null}>
          <Text>No content, no tooltip</Text>
        </Tooltip>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TooltipArgs>;

const Overview = overviewStory({
  component: 'Tooltip',
  description: 'A short note that appears while the pointer rests on an element, for a cost, a hint or the full text behind a short label. Wrap any element in it and pass the note as content. It opens above by default or below with placement, and draws in a portal so a clipped panel does not cut it off. With no content it draws nothing.',
  playground: Playground,
  variants: [Placements],
});

export default meta;
export { Overview, Placements, Playground };
