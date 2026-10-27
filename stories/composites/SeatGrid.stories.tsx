/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { SeatGridDemo } from './_samples/SeatGridDemo';
import type { SeatGridArgs } from './_samples/seat-grid-story.type';

const ARGS: SeatGridArgs = { minWidth: 'md', gap: 'md', seats: 7 };

const ARG_TYPES: PlaygroundArgTypes<SeatGridArgs> = {
  minWidth: { group: 'Layout', control: 'select', options: ['sm', 'md', 'lg'], description: 'The smallest width of a seat: 160, 224 or 288 px.' },
  gap: { group: 'Layout', control: 'select', options: ['xs', 'sm', 'md', 'lg'], description: 'The space between seats.' },
  seats: { group: 'Content', control: 'number', description: 'How many seats are drawn, the last one the add seat.' },
};

const meta = {
  title: 'Composites · Content/SeatGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SeatGridArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SeatGridDemo {...args} />,
} satisfies PlaygroundStory<SeatGridArgs>;

const Small = {
  name: 'Small seats, tight gap',
  render: () => <SeatGridDemo minWidth="sm" gap="xs" seats={9} />,
} satisfies StoryLiteStoryDefinition<SeatGridArgs>;

const Large = {
  name: 'Large seats, wide gap',
  render: () => <SeatGridDemo minWidth="lg" gap="lg" seats={5} />,
} satisfies StoryLiteStoryDefinition<SeatGridArgs>;

const Overview = overviewStory({
  component: 'SeatGrid',
  description: 'The grid that lays seat cards side by side and wraps them to the width.',
  points: [
    'Seats fill the row at `minWidth` (`sm`, `md` or `lg`) and share the free width.',
    '`gap` sets the space between seats: `xs`, `sm`, `md` or `lg`.',
    '`label` names the group for a screen reader. Put the add seat last.',
  ],
  instead: '[Grid] for any other cards, or [VirtualGrid] for a long grid drawn only where it is in view.',
  playground: Playground,
  variants: [Small, Large],
});

export default meta;
export { Large, Overview, Playground, Small };
