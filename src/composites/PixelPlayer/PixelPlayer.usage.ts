/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Plays a pixel animation inline, with a whole-number zoom, a control bar, frame ranges and keys; one frame shows as a still.',
  useWhen: [
    'A preview pane shows the picked sprite or animation and the reader needs to play, pause and step through it.',
    'A sheet preview needs outlines on hover over named cells, with the cell reported to the host.',
  ],
  avoidWhen: [
    { case: 'A small fixed square in a row or tile, with no controls.', use: 'PixelThumbnail' },
    { case: 'The source is a video file, not frames in memory.', use: 'Video' },
  ],
  rules: [
    'Pass `frames` with a duration for each; one frame is a still with no bar and no counter.',
    '`zoom="fit"` picks the largest whole number that fits the stage, never below 1; the stage height follows the `--pixel-player-stage` property.',
    'Give `tags` to limit play to one named range; pass `tagId` and `onTagChange` to control which one.',
    '`loop.direction` is `forward`, `reverse`, `pingpong` or `pingpongReverse`; the last starts on the final frame going backward, then bounces.',
    '`loop.repeat` of 0 runs forever; with a count, Play becomes Replay when the loop ends.',
    '`mode="compact"` hides the bar and the counter; keep `frames` stable between renders so playback does not restart.',
  ],
  a11y: [
    'The stage is one tab stop: Space plays and pauses, Left and Right step, Home and End jump.',
    'The picture is an image with the `label`; the controls are a named group of labelled buttons.',
    'The counter is a status that is read when a step changes it, not on every tick of playback.',
    'Reduced motion never starts playback by itself; Play still works. A hidden page stops playback.',
  ],
  buildingBlock: true,
  example: `import { PixelPlayer } from '@drizztdourden08/tessera';
import type { PixelThumbnailFrame } from '@drizztdourden08/tessera';

const SpritePreview = ({ frames }: { frames: readonly PixelThumbnailFrame[] }) => (
  <PixelPlayer label="Walk cycle" frames={frames} loop={{ direction: 'pingpong', repeat: 0 }} />
);
`,
  propsHash: '618d4e0559735cef',
} satisfies ComponentUsage;

export { usage };
