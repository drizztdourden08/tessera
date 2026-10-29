/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DragGhostSample } from './_samples/DragGhostSample';
import { NativeDragGhostSample } from './_samples/NativeDragGhostSample';
import './DragGhost.stories.css';

type DragGhostArgs = {
  count: number;
  thumbnails: number;
};

const ARGS: Partial<DragGhostArgs> = { count: 5, thumbnails: 3 };

const ARG_TYPES: PlaygroundArgTypes<DragGhostArgs> = {
  count: { group: 'Content', control: 'range', min: 1, max: 99, step: 1, description: 'How many items are dragged; shown in the badge.' },
  thumbnails: { group: 'Content', control: 'range', min: 0, max: 5, step: 1, description: 'How many thumbnails are given; at most three are stacked.' },
};

const meta = {
  title: 'Composites · Data views/DragGhost',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DragGhostArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DragGhostSample count={args.count} thumbnails={args.thumbnails} />,
} satisfies PlaygroundStory<DragGhostArgs>;

const One = {
  name: 'One item',
  render: () => <DragGhostSample count={1} thumbnails={1} />,
} satisfies StoryLiteStoryDefinition<DragGhostArgs>;

const Many = {
  name: 'Many items: a stack of three thumbnails and the count',
  render: () => <DragGhostSample count={24} thumbnails={5} />,
} satisfies StoryLiteStoryDefinition<DragGhostArgs>;

const Native = {
  name: 'Native drag and drop: the ghost is the drag image of a draggable element',
  render: () => <NativeDragGhostSample count={4} />,
} satisfies StoryLiteStoryDefinition<DragGhostArgs>;

const CODE = `import { DragGhost, useNativeDragGhost, useReorderDrag } from '@drizztdourden08/tessera';

const drag = useReorderDrag({ listRef, selector: REORDER_ITEM_SELECTOR, keys: pickedKeys, onDrop });

<DragGhost count={drag.dragKeys.length} thumbnails={thumbnails} point={drag.point} />

const ghost = useNativeDragGhost();

<Button draggable onDragStart={(event) => ghost.onDragStart(event, { count: 3, thumbnails })}>Drag</Button>`;

const Overview = overviewStory({
  component: 'DragGhost',
  description: 'The picture that follows the pointer while items are dragged: up to three thumbnails and a count.',
  points: [
    '`count` is the number of items dragged and shows in a badge.',
    '`thumbnails` is a list of nodes; at most three are stacked, and never more than `count`.',
    '`point` places it at the pointer in a layer above the page; `null` draws nothing.',
    'Without `point` it draws in place, as in these stories.',
    'It takes no pointer events, so the drop target below keeps its hover.',
    '`useNativeDragGhost` draws it as the drag image of a native drag and drop, with a count.',
  ],
  instead: '[MarqueeBox] for the rectangle of a drag that picks items.',
  playground: Playground,
  variants: [One, Many, Native],
  states: {
    render: (props: StateProps) => <DragGhostSample count={3} thumbnails={3} {...props} />,
    list: [
      { name: 'One', props: { count: 1, thumbnails: 1 } },
      { name: 'Stack', props: { count: 12, thumbnails: 3 } },
    ],
  },
  code: CODE,
});

export default meta;
export { Many, Native, One, Overview, Playground };
