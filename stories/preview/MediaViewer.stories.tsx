/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { FileMediaSample } from './MediaViewer/_samples/FileMediaSample';
import { PictureSetSample } from './MediaViewer/_samples/PictureSetSample';
import { VIEWER_CHOICES, VIEWER_CODE, VIEWER_MAPPING } from './MediaViewer/_samples/media-viewer-story.constants';
import './MediaViewer.stories.css';

type ViewerArgs = Record<string, never>;

const meta = {
  title: 'Preview · For approval/MediaViewer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ViewerArgs>;

const Playground = {
  name: 'Playground',
  render: () => <PictureSetSample />,
} satisfies PlaygroundStory<ViewerArgs>;

const FilePane = {
  name: 'A file in Sanctuary: the small picture opens large',
  render: () => <FileMediaSample />,
} satisfies StoryLiteStoryDefinition<ViewerArgs>;

const PictureSet = {
  name: 'A set of pictures and a video, with arrows between them',
  render: () => <PictureSetSample />,
} satisfies StoryLiteStoryDefinition<ViewerArgs>;

const Overview = overviewStory({
  component: 'MediaViewer',
  description: 'For approval, not a released part: a picture or a video opened large over the page, with zoom and arrows through a set.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    'Opens as a dialog: Escape or the close button closes it, and focus comes back where it was.',
    'A picture fits the window first; the zoom buttons or the minus and plus keys zoom by steps up to 1600%.',
    'The middle button or a double click swaps Fit and actual size; drag the picture to look around.',
    'Small sprites stay sharp instead of blurry, on their own; `pixelated` turns that on or off.',
    'With several `items`, arrows and the Left and Right keys move through them; a video starts at `startAt`.',
  ],
  instead: '[Image] for a picture in the page; [Video] with its theatre mode for a video that stays in the page.',
  playground: Playground,
  variants: [FilePane, PictureSet],
  sections: [
    { title: 'What it replaces', node: <PreviewCards entries={VIEWER_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={VIEWER_CHOICES} /> },
  ],
  code: VIEWER_CODE,
});

export default meta;
export { FilePane, Overview, PictureSet, Playground };
