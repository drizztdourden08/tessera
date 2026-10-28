/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { BreadcrumbsDemo } from './_samples/BreadcrumbsDemo';

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

const CODE = `import { Breadcrumbs } from '@drizztdourden08/tessera';

<Breadcrumbs
  segments={[
    { id: 'project', label: 'Mossgrove', icon: 'folder' },
    { id: 'art', label: 'art', siblings: [{ id: 'audio', label: 'audio', onSelect: openAudio }] },
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
    '`segments` run from the root to the current place; the last one is current.',
    'A segment takes an `icon` and `siblings`, which a chevron opens as a menu of its neighbours.',
    '`maxVisible` keeps the first and the last segments and folds the middle ones behind an ellipsis.',
    '`onDropOn` makes every segment a drop target; `canDrop` turns a drag away.',
    '`onPathSubmit` turns a click on the empty end of the bar into a [PathInput]; `trailing` takes small [Tag] chips.',
  ],
  instead: '[Tabs] to move between views of one area.',
  playground: Playground,
  variants: [Siblings, Folded, Dropping, PathBox],
  code: CODE,
});

export default meta;
export { Dropping, Folded, Overview, PathBox, Playground, Siblings };
