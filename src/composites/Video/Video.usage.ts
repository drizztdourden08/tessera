/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A video player with its own control bar: seek with a time preview, volume, speed, picture in picture, theater mode and full screen.',
  useWhen: [
    'A replay, a clip or a live stream plays inside the app.',
    'The user seeks, changes the volume or the speed, or watches in full screen.',
  ],
  avoidWhen: [
    { case: 'A still picture holds its box, such as a poster or a screenshot.', use: 'Image' },
    { case: 'A small framed preview stands for the video in a list.', use: 'Thumbnail' },
  ],
  rules: [
    'Give it a label that names the video, such as Boss fight replay; the player is a group named by it.',
    'Size the player through its class with an aspect ratio, since the bar sits over the bottom of the video.',
    'Let the page own theater mode through theater and onTheaterChange when the layout around the player changes with it.',
    'Set controls to false for a background or a preview with no bar.',
  ],
  a11y: [
    'The player takes focus: Space or K plays and pauses, the arrows skip five seconds, M mutes, F goes full screen and T sets theater mode.',
    'The seek bar reads the time as 1:05 of 3:20, and Page Up, Page Down, Home and End jump along it.',
    'The speed menu holds radio items: the arrows move, Enter picks, Escape closes it and focus goes back to its button.',
    'The bar fades while the video plays and the pointer rests, and comes back on a key, a move or focus.',
  ],
  tree: {
    path: ['data', 'a picture or a video', 'a video'],
    rule: 'Video draws its bar over the video in white on black in every theme, and keeps its speed menu and volume inside the frame so they work in full screen.',
  },
  example: `import { Video } from '@drizztdourden08/tessera';

const Replay = ({ url, poster }: { url: string; poster: string }) => (
  <Video src={url} poster={poster} label="Boss fight replay" className="replay-player" playsInline />
);
`,
  propsHash: '65a901068ac25b59',
} satisfies ComponentUsage;

export { usage };
