/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { BreadcrumbsDemo } from './_samples/BreadcrumbsDemo';
import { BreadcrumbsHooksDemo } from './_samples/BreadcrumbsHooksDemo';
import { BreadcrumbsPointerDemo } from './_samples/BreadcrumbsPointerDemo';

type BreadcrumbsArgs = { withSiblings: boolean; maxVisible: number; withDrop: boolean; editable: boolean; withTags: boolean };

const ARGS: BreadcrumbsArgs = { withSiblings: true, maxVisible: 6, withDrop: false, editable: false, withTags: false };

const ARG_TYPES: PlaygroundArgTypes<BreadcrumbsArgs> = {
  withSiblings: { group: 'Content', control: 'boolean', description: 'A chevron after a segment lists the places next to it.' },
  withTags: { group: 'Content', control: 'boolean', description: 'The trailing slot, with a Tag.' },
  maxVisible: { group: 'Layout', control: 'range', min: 3, max: 6, step: 1, description: 'Past this many segments the middle ones fold into an ellipsis menu.' },
  withDrop: { group: 'Behaviour', control: 'boolean', description: 'Every segment accepts a drop.' },
  editable: { group: 'Behaviour', control: 'boolean', description: 'A click on the empty space at the end turns the trail into a path box.' },
};

const meta = {
  title: 'Composites · Navigation/Breadcrumbs',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BreadcrumbsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <BreadcrumbsDemo key={String(args.maxVisible)} {...args} />,
} satisfies PlaygroundStory<BreadcrumbsArgs>;

const Siblings = {
  name: 'Icons and a menu of the places next to a segment',
  render: () => <BreadcrumbsDemo />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const Folded = {
  name: 'maxVisible 4: the middle folds into an ellipsis menu',
  render: () => <BreadcrumbsDemo maxVisible={4} />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const Dropping = {
  name: 'Every segment is a drop target',
  render: () => <BreadcrumbsDemo withDrop />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const PathBox = {
  name: 'A click at the end turns the trail into a path box; Enter goes, Escape cancels',
  render: () => <BreadcrumbsDemo editable withTags />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const MenuSegments = {
  name: 'opensMenu: the segment itself is the menu, and the chips are a named group',
  render: () => <BreadcrumbsDemo menuSegments withTags />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const DropTargeted = {
  name: 'dropTarget: the props a drag and drop library attaches, per segment',
  render: () => <BreadcrumbsHooksDemo feature="dropTarget" />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const SpringOpened = {
  name: 'Holding a drag over a segment opens its siblings menu',
  render: () => <BreadcrumbsHooksDemo feature="spring" />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const PointerDropped = {
  name: 'dropOverId: a pointer drag held over a segment draws the drop look and opens its menu',
  render: () => <BreadcrumbsPointerDemo />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const PointerNavigated = {
  name: 'springOpen navigate: holding a pointer drag over a segment opens that place',
  render: () => <BreadcrumbsPointerDemo springOpen="navigate" />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const Validated = {
  name: 'validate: a message under the path box and Enter held back',
  render: () => <BreadcrumbsHooksDemo feature="validate" />,
} satisfies StoryLiteStoryDefinition<BreadcrumbsArgs>;

const CODE = `import { Breadcrumbs } from '@drizztdourden08/tessera';

<Breadcrumbs
  segments={[
    { id: 'project', label: 'Mossgrove', icon: 'folder' },
    { id: 'art', label: 'art', title: 'Art assets', siblings: [{ id: 'audio', label: 'audio', group: 'Assets', onSelect: openAudio }] },
    { id: 'sprites', label: 'sprites' },
  ]}
  maxVisible={4}
  onNavigate={open}
  onPathSubmit={openPath}
/>`;

const Overview = overviewStory({
  component: 'Breadcrumbs',
  description: 'The trail of places that leads to the current one, with neighbour menus, a fold and a path box.',
  points: [
    '`segments` run from the root to the current place; each takes an `icon`, a `title` and `siblings`.',
    '`opensMenu` makes a segment the menu; `maxVisible` folds the middle segments behind an ellipsis.',
    '`onDropOn` makes every segment a drop target; `canDrop` turns a drag away; `dropTarget` plugs in a library.',
    '`onPathSubmit` makes the end a [PathInput] checked by `validate`; `trailing` takes [Tag] chips.',
    'A drag held over a segment opens its menu after a short delay; `springOpen` can open that place instead.',
    '`onSegmentRef` and `dropOverId` serve a pointer based drag and drop library with no native drag events.',
  ],
  instead: '[Tabs] to move between views of one area.',
  playground: Playground,
  variants: [Siblings, MenuSegments, Folded, Dropping, DropTargeted, SpringOpened, PointerDropped, PointerNavigated, PathBox, Validated],
  code: CODE,
});

export default meta;
export { Dropping, DropTargeted, Folded, MenuSegments, Overview, PathBox, Playground, PointerDropped, PointerNavigated, Siblings, SpringOpened, Validated };
