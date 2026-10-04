/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Text, Video } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LiveCanvasVideo } from './_samples/LiveCanvasVideo';
import { TheaterPage } from './_samples/TheaterPage';
import { VIDEO_CLIP, VIDEO_POSTER } from './_samples/video-clip';
import './Video.stories.css';

type VideoSource = 'Sample clip' | 'Live stream' | 'Broken source';

type VideoArgs = {
  source: VideoSource;
  poster: boolean;
  autoPlay: boolean;
  muted: boolean;
  loop: boolean;
  controls: boolean;
  theater: boolean;
};

const SOURCES: readonly VideoSource[] = ['Sample clip', 'Live stream', 'Broken source'];

const BROKEN_SOURCE = 'data:video/webm;base64,AAAA';

const ARGS: Partial<VideoArgs> = { source: 'Sample clip', poster: true, autoPlay: false, muted: false, loop: false, controls: true, theater: false };

const ARG_TYPES: PlaygroundArgTypes<VideoArgs> = {
  source: { group: 'Content', control: 'select', options: [...SOURCES] },
  poster: { group: 'Content', control: 'boolean' },
  theater: { group: 'Layout', control: 'boolean' },
  autoPlay: { group: 'Behaviour', control: 'boolean' },
  muted: { group: 'Behaviour', control: 'boolean' },
  loop: { group: 'Behaviour', control: 'boolean' },
  controls: { group: 'Behaviour', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Display/Video',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VideoArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (args.source === 'Live stream' ? (
    <LiveCanvasVideo controls={args.controls} />
  ) : (
    <Video
      key={`${args.source}-${args.autoPlay}-${args.theater}`}
      className="video-demo"
      src={args.source === 'Broken source' ? BROKEN_SOURCE : VIDEO_CLIP}
      poster={args.poster ? VIDEO_POSTER : undefined}
      autoPlay={args.autoPlay}
      muted={args.muted}
      loop={args.loop}
      controls={args.controls}
      defaultTheater={args.theater}
      playsInline
    />
  )),
} satisfies PlaygroundStory<VideoArgs>;

const LiveStream = {
  name: 'Live stream',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">A stream passed through the ref as a source object has no length, so the seek bar stays disabled.</Text>
      <LiveCanvasVideo controls />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const TheaterMode = {
  name: 'Theater mode',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">The theater button or the T key widens the player across its column in a darker band. Here the page owns the state, so the side list moves below the player.</Text>
      <TheaterPage />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const NoControls = {
  name: 'No controls',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">With controls off it is a framed video with no bar, for backgrounds and previews.</Text>
      <Video className="video-demo" src={VIDEO_CLIP} controls={false} autoPlay muted loop playsInline />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const renderState = (props: StateProps) => (
  <Video className="video-demo" src={VIDEO_CLIP} poster={VIDEO_POSTER} playsInline label="Replay" {...props} />
);

const Overview = overviewStory({
  component: 'Video',
  description: 'A video player in the Tessera look, for replays, clips and live streams.',
  points: [
    'It takes every native video attribute and a ref, and draws its own control bar.',
    'The bar has a seek bar with a time preview, volume, speed, picture in picture, theater mode and full screen.',
    '[[Space]] or [[K]] plays and pauses, the arrows skip five seconds, and [[F]] goes full screen.',
    'Theater mode works on its own, or a page can own it through `theater` and `onTheaterChange`.',
    'Set `controls` to `false` for a bare framed video.',
  ],
  playground: Playground,
  variants: [TheaterMode, LiveStream, NoControls],
  states: {
    render: renderState,
    list: [
      { ...STATE.idle, name: 'Not started' },
      { name: 'Playing', props: { poster: undefined, autoPlay: true, muted: true, loop: true } },
      { name: 'Theater', props: { defaultTheater: true } },
      { ...STATE.error, props: { src: BROKEN_SOURCE, poster: undefined, errorMessage: 'This replay could not be loaded.' } },
    ],
  },
  code: `import { Video } from '@drizztdourden08/tessera';

<Video src={replayUrl} poster={posterUrl} label="Boss fight replay" playsInline />`,
});

export default meta;
export { LiveStream, NoControls, Overview, Playground, TheaterMode };
