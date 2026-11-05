/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { OverflowRow } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { headerItems, scrollItems, tightItems } from './_samples/overflow-row-items';
import './OverflowRow.stories.css';

type OverflowRowArgs = {
  width: string;
};

const ARGS: Partial<OverflowRowArgs> = { width: '384' };

const ARG_TYPES: PlaygroundArgTypes<OverflowRowArgs> = {
  width: { group: 'Layout', control: 'select', options: ['256', '384', '512', '768'], description: 'The width of the box around the row, in pixels.' },
};

const meta = {
  title: 'Composites · Actions/OverflowRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OverflowRowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="overflow-row-story" data-width={args.width}>
      <OverflowRow items={headerItems()} />
    </Box>
  ),
} satisfies PlaygroundStory<OverflowRowArgs>;

const Narrow = {
  name: 'A header 256 px wide',
  render: () => <Box className="overflow-row-story" data-width="256"><OverflowRow items={headerItems()} /></Box>,
} satisfies StoryLiteStoryDefinition<OverflowRowArgs>;

const Wide = {
  name: 'Room for every item',
  render: () => <Box className="overflow-row-story" data-width="768"><OverflowRow items={headerItems()} /></Box>,
} satisfies StoryLiteStoryDefinition<OverflowRowArgs>;

const Tight = {
  name: 'Pinned item shrinks when tight',
  render: () => <Box className="overflow-row-story" data-width="256"><OverflowRow items={tightItems()} /></Box>,
} satisfies StoryLiteStoryDefinition<OverflowRowArgs>;

const Scroll = {
  name: 'Shrinking tabs scroll sideways',
  render: () => <Box className="overflow-row-story" data-width="256"><OverflowRow items={scrollItems()} /></Box>,
} satisfies StoryLiteStoryDefinition<OverflowRowArgs>;

const CODE = `import { OverflowRow } from '@drizztdourden08/tessera';

<OverflowRow
  items={[
    { id: 'name', pinned: true, node: <Text as="span" variant="title">Keysanity</Text> },
    { id: 'status', priority: 5, node: <Tag variant="urgency" color="success">Running</Tag> },
    { id: 'players', priority: 3, node: <Text as="span" variant="caption">3 players</Text> },
    { id: 'gear', pinned: true, node: <IconButton label="Settings"><Icon name="settings" /></IconButton> },
  ]}
/>`;

const Overview = overviewStory({
  component: 'OverflowRow',
  description: 'One row of any nodes that never wraps, with the least important ones folded into a popover when the width runs out.',
  points: [
    '`items` keep their order; each has an `id` and a `node`.',
    'A higher `priority` stays longer; the lowest priority unpinned item folds first.',
    '`pinned` items never fold; `end` puts an item and the ones after it at the far right.',
    '`node` may take `{ tight }`, true when pinned items alone overflow; `shrink` lets one narrow and scroll.',
    '`menuNode` is how an item looks inside the popover; it defaults to `node`.',
    'More shows only when something is folded; Escape or a press outside closes it and focus returns.',
  ],
  instead: '[ActionBar] for actions on one item, or [Toolbar] for tools.',
  playground: Playground,
  variants: [Narrow, Wide, Tight, Scroll],
  states: {
    render: (props: StateProps) => <Box className="overflow-row-story" data-width="384"><OverflowRow items={headerItems()} {...props} /></Box>,
    list: [
      { name: 'Idle', props: {} },
    ],
  },
  code: CODE,
});

export default meta;
export { Narrow, Overview, Playground, Scroll, Tight, Wide };
