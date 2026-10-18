/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { Box } from '../../src/primitives';
import { SpriteStudioSample } from './_samples/SpriteStudioSample';
import { StudioBesideListSample } from './_samples/StudioBesideListSample';
import { STUDIO_CODE } from './_samples/studio-story.constants';
import './StudioLayout.stories.css';

type StudioArgs = { bar: boolean; folded: boolean; narrow: boolean };

const meta = {
  title: 'Composites · Layout/StudioLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StudioArgs>;

const frameClass = (narrow: boolean) => (narrow ? 'studio-demo-frame studio-demo-frame--narrow' : 'studio-demo-frame');

const Playground = {
  name: 'Playground',
  args: { bar: true, folded: false, narrow: false },
  argTypes: {
    bar: { group: 'Content', control: 'boolean', description: 'The raised top bar with the title, the action groups and the hint line.' },
    folded: { group: 'State', control: 'boolean', description: 'Both side panels start folded to a rail.' },
    narrow: { group: 'Appearance', control: 'boolean', description: 'A 560 px wide frame, where the columns stack.' },
  },
  render: (args) => (
    <Box className={frameClass(args.narrow)}>
      <SpriteStudioSample key={String(args.folded)} folded={args.folded} bar={args.bar} />
    </Box>
  ),
} satisfies PlaygroundStory<StudioArgs>;

const Wide = {
  name: 'A sprite studio: list, editor and inspector',
  render: () => <Box className={frameClass(false)}><SpriteStudioSample /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const Folded = {
  name: 'Both side panels folded to a rail',
  render: () => <Box className={frameClass(false)}><SpriteStudioSample folded /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const Narrow = {
  name: 'Narrow: the columns stack',
  render: () => <Box className={frameClass(true)}><SpriteStudioSample /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const BesideList = {
  name: 'Beside a list: the studio in the detail of a ListDetailLayout',
  render: () => <Box className="studio-demo-frame studio-demo-frame--list"><StudioBesideListSample /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const CompactToolbar = {
  name: 'Compact toolbar: the tools in one row of small controls',
  render: () => <Box className={frameClass(false)}><SpriteStudioSample compact /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const Overview = overviewStory({
  component: 'StudioLayout',
  description: 'The frame of a studio screen: a list on the left, an editor in the centre and an inspector on the right.',
  points: [
    '`bar` adds a raised top bar: the title, labelled action groups and a [HintLine] for what is under the pointer.',
    '`start` and `end` are [SidePanel]s: each has a heading, folds to a rail and resizes by drag.',
    'The editor sits in a [ToolFrame]; `toolbar` puts [ToolGroups] on its top edge.',
    '`compactToolbar` keeps that toolbar to one row of small controls, 45 px high, with the group names hidden.',
    'The columns stack only when the open panels, the folded rails and `editorMinWidth` (192 px) do not fit.',
    'Give each panel a `storageKey` to keep its width and its fold between visits.',
  ],
  instead: '[ListDetailLayout] for a list of records beside one detail; [DockLayout] for panels the user moves.',
  playground: Playground,
  variants: [Wide, Folded, Narrow, BesideList, CompactToolbar],
  code: STUDIO_CODE,
});

export default meta;
export { BesideList, CompactToolbar, Folded, Narrow, Overview, Playground, Wide };
