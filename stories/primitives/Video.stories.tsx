/* @layer stories @kind story */
import { useEffect, useRef } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Text, Video } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Video.stories.css';

type VideoArgs = {
  controls: boolean;
};

const WIDTH = 320;
const HEIGHT = 180;

const tokenColor = (el: Element, name: string, fallback: string) =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

const POSTER_URI = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'>`
  + `<rect width='160' height='90' fill='#20242c'/>`
  + `<polygon points='68,30 68,60 94,45' fill='#e8e8ec'/>`
  + `<text x='8' y='84' font-family='monospace' font-size='7' fill='#9a9aa6'>Replay: boss fight, 01:42</text>`
  + `</svg>`,
)}`;

const LiveCanvasVideo = ({ controls }: { controls: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!video || !ctx) return undefined;

    const background = tokenColor(video, '--c-sunken', 'black');
    const accent = tokenColor(video, '--c-primary', 'goldenrod');
    const ink = tokenColor(video, '--c-text', 'white');
    let frame = 0;
    let raf = 0;

    const draw = () => {
      const progress = (frame % 240) / 240;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = accent;
      ctx.fillRect(16, HEIGHT - 28, (WIDTH - 32) * progress, 8);
      ctx.beginPath();
      ctx.arc(16 + (WIDTH - 32) * progress, 80, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.font = '14px monospace';
      ctx.fillText(`Frame ${frame}`, 16, 28);
      frame += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    const stream = canvas.captureStream(30);
    video.srcObject = stream;
    video.play().catch(() => undefined);

    return () => {
      cancelAnimationFrame(raf);
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    };
  }, []);

  return <Video ref={videoRef} className="video-demo" muted playsInline autoPlay controls={controls} />;
};

const ARGS: Partial<VideoArgs> = { controls: true };

const ARG_TYPES: StoryLiteArgTypes<VideoArgs> = {
    controls: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Display/Video',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VideoArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Text variant="subtitle">A live canvas animation streamed into the video element.</Text>
      <LiveCanvasVideo controls={args.controls} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const Poster = {
  name: 'Poster before playback',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Text variant="subtitle">No source is loaded yet, so the poster frame stands in for the replay.</Text>
      <Video className="video-demo" poster={POSTER_URI} preload="none" controls={args.controls} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<VideoArgs>;

const Overview = overviewStory({
  component: 'Video',
  description: 'The design system stand-in for a raw video element, for replays, clips and live streams. It takes every native video attribute and a ref, so a caller can set a src, a poster or a srcObject stream. It adds no style or controls of its own: the browser controls show when controls is set.',
  playground: Playground,
  variants: [Poster],
  code: `import { Video } from '@drizztdourden08/tessera';

<Video src="/replays/boss-fight.webm" poster="/replays/boss-fight.png" controls muted playsInline />`,
});

export default meta;
export { Overview, Playground, Poster };
