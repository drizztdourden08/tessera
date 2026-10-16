/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { Box } from '../../src/primitives';
import { PreviewCards } from './_shared/PreviewCards';
import { SpriteStudioSample } from './StudioLayout/_samples/SpriteStudioSample';
import { STUDIO_CHOICES, STUDIO_CODE, STUDIO_MAPPING } from './StudioLayout/_samples/studio-story.constants';
import './StudioLayout.stories.css';

type StudioArgs = { folded: boolean; narrow: boolean };

const meta = {
  title: 'Preview · For approval/StudioLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StudioArgs>;

const Playground = {
  name: 'Playground',
  args: { folded: false, narrow: false },
  argTypes: {
    folded: { group: 'State', control: 'boolean', description: 'Both side panels start folded to a rail.' },
    narrow: { group: 'Appearance', control: 'boolean', description: 'A 560 px wide frame that grows with its content, below the 768 px where the columns stack.' },
  },
  render: (args) => (
    <Box className={args.narrow ? 'studio-demo-frame studio-demo-frame--narrow' : 'studio-demo-frame'}>
      <SpriteStudioSample key={String(args.folded)} folded={args.folded} />
    </Box>
  ),
} satisfies PlaygroundStory<StudioArgs>;

const Wide = {
  name: 'Wide: list, editor and inspector',
  render: () => <Box className="studio-demo-frame"><SpriteStudioSample /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const Folded = {
  name: 'Both side panels folded to a rail',
  render: () => <Box className="studio-demo-frame"><SpriteStudioSample folded /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const Narrow = {
  name: 'Narrow: the columns stack',
  render: () => <Box className="studio-demo-frame studio-demo-frame--narrow"><SpriteStudioSample /></Box>,
} satisfies StoryLiteStoryDefinition<StudioArgs>;

const Overview = overviewStory({
  component: 'StudioLayout',
  description: 'For approval, not a released part: the frame of a studio, with a list on the left, an editor in the centre and an inspector on the right.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    'A raised top bar names what is open and groups the file actions under labels, with a HintLine under them.',
    'Each side panel has a heading and folds to a rail, its title down the side; the editor takes the room.',
    'The editor is one sunken frame with its toolbar on its top edge.',
    'Below 768 px the columns stack: the list, the editor, then the inspector, and the body scrolls.',
    'The panels, the bar and the editor are drawn on Box surfaces, raised and sunken, with no colours of their own.',
  ],
  instead: '[ListDetailLayout] for a list of records beside one editor; [DockLayout] for panels the user moves.',
  playground: Playground,
  variants: [Wide, Folded, Narrow],
  sections: [
    { title: 'What it replaces', node: <PreviewCards entries={STUDIO_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={STUDIO_CHOICES} /> },
  ],
  code: STUDIO_CODE,
});

export default meta;
export { Folded, Narrow, Overview, Playground, Wide };
