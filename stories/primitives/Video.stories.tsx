/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Text, Video } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
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

const ARG_TYPES: StoryLiteArgTypes<VideoArgs> = {
  source: { control: 'select', options: [...SOURCES] },
  poster: { control: 'boolean' },
  autoPlay: { control: 'boolean' },
  muted: { control: 'boolean' },
  loop: { control: 'boolean' },
  controls: { control: 'boolean' },
  theater: { control: 'boolean' },
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
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const WithPoster = {
  name: 'With a poster',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">The poster and a large play button stand in until the first play.</Text>
      <Video className="video-demo" src={VIDEO_CLIP} poster={VIDEO_POSTER} playsInline />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const PlayingMutedLoop = {
  name: 'Playing, muted, on a loop',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">Starts on its own without sound. The bar fades after a moment and comes back on pointer move or focus.</Text>
      <Video className="video-demo" src={VIDEO_CLIP} autoPlay muted loop playsInline label="Looping clip" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

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

const BrokenSource = {
  name: 'Broken source',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">A source that cannot be read shows the error message in place of the controls.</Text>
      <Video className="video-demo" src={BROKEN_SOURCE} errorMessage="This replay could not be loaded." />
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

const Overview = overviewStory({
  component: 'Video',
  description: 'A video player in the Tessera look, for replays, clips and live streams. It takes every native video attribute and a ref, and draws its own control bar in place of the browser one: play and pause, a seek bar with the buffered part and a time preview, the time, volume, playback speed, picture in picture, theater mode and full screen. Space or K plays and pauses, the arrows skip five seconds, M mutes, T toggles theater mode and F goes full screen. Theater mode works on its own, or a page can own it through theater and onTheaterChange. It shows a spinner while it waits for data and a message when the source fails. Set controls to false for a bare framed video.',
  playground: Playground,
  variants: [WithPoster, PlayingMutedLoop, TheaterMode, LiveStream, BrokenSource, NoControls],
  code: `import { Video } from '@drizztdourden08/tessera';

<Video src={replayUrl} poster={posterUrl} label="Boss fight replay" playsInline />`,
});

export default meta;
export { BrokenSource, LiveStream, NoControls, Overview, Playground, PlayingMutedLoop, TheaterMode, WithPoster };
