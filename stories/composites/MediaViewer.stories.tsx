/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { FileMediaSample } from './_samples/FileMediaSample';
import { PictureSetSample } from './_samples/PictureSetSample';
import { VIEWER_CODE } from './_samples/media-viewer-story.constants';
import './MediaViewer.stories.css';

type ViewerArgs = Record<string, never>;

const meta = {
  title: 'Composites · Dialogs/MediaViewer',
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
  description: 'A picture or a video opened large over the page, with zoom and arrows through a set.',
  points: [
    'Opens as a dialog: Escape or the close button closes it, and focus comes back where it was.',
    'A picture fits the window first; the zoom buttons or the minus and plus keys zoom by steps to 1600%.',
    'The middle button or a double click swaps Fit and actual size; drag the picture to look around.',
    'Small sprites stay sharp instead of blurry, on their own; `pixelated` turns that on or off.',
    'With several `items`, arrows and the Left and Right keys move through them, with 2 of 6 on top.',
    'A video plays in Video with its own controls, from `startAt`, where the small preview stopped.',
  ],
  instead: '[Image] for a picture in the page; [Video] with its theatre mode for a video that stays in the page.',
  playground: Playground,
  variants: [FilePane, PictureSet],
  code: VIEWER_CODE,
});

export default meta;
export { FilePane, Overview, PictureSet, Playground };
