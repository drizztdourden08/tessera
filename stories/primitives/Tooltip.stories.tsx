/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Status, Text, Tooltip } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type Placement = 'top' | 'bottom';

type TooltipArgs = {
  content: string;
  placement: Placement;
  trigger: string;
};

const ARGS: Partial<TooltipArgs> = { content: 'Costs 25% of your rupees', placement: 'top', trigger: 'Buy a hint' };

const ARG_TYPES: PlaygroundArgTypes<TooltipArgs> = {
    content: { group: 'Content', control: 'text' },
    trigger: { group: 'Content', control: 'text' },
    placement: { group: 'Layout', control: 'select', options: ['top', 'bottom'] },
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
} satisfies PlaygroundStory<TooltipArgs>;

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
          <Status>3 online</Status>
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
  description: 'A short note that appears while the pointer rests on an element, such as a cost or the full text of a label.',
  points: [
    'Wrap any element in it and pass the note as `content`.',
    'It opens above by default, or below with `placement="bottom"`.',
    'It draws above the page, so a clipped panel does not cut it off.',
    'With no `content` it draws nothing.',
  ],
  instead: '[HintLine] for a panel that explains every option in one place.',
  playground: Playground,
  variants: [Placements],
});

export default meta;
export { Overview, Placements, Playground };
