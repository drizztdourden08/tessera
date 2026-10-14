/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Opens a picture or a video large over the page in a dialog, with zoom by steps, a Fit and actual size switch, dragging to look around, and arrows through a set.',
  useWhen: [
    'A small picture of a file, a store item or a save opens large when the user presses it or an Expand button.',
    'A sprite or a sprite sheet is looked at closely, pixel by pixel.',
  ],
  avoidWhen: [
    { case: 'The picture stays in the page.', use: 'Image' },
    { case: 'The video stays in the page, with theatre mode and full screen.', use: 'Video' },
    { case: 'Slides turn in the page itself.', use: 'Carousel' },
  ],
  rules: [
    'Pass items as id, kind image or video, src and name; the name is the title of the dialog.',
    'Pass index and onIndexChange, or defaultIndex, to open on the item the user pressed.',
    'Draw the small picture with Expand as a recipe: an Image in a Pressable and a Button that set open.',
    'Pass startAt in seconds when a small video preview was playing, so the large one starts where it stopped.',
    'Leave pixelated on auto: pictures of 256 pixels or less on their longest side stay sharp; pass true or false to force it.',
  ],
  a11y: [
    'It is a DialogShell named by the item name: Escape and the close button close it, and focus goes back to what opened it.',
    'The zoom buttons, the minus and plus keys, and 0 for Fit work from anywhere in the dialog; the Left and Right keys move through a set.',
    'The place in a set, such as 2 of 6, is a polite live region.',
  ],
  tree: {
    path: ['something over the page', 'a picture or a video opened large, with zoom'],
    rule: 'MediaViewer opens a picture or a video large in a dialog, with zoom, dragging and arrows through a set.',
  },
  example: `import { useState } from 'react';
import { MediaViewer } from '@drizztdourden08/tessera';
import type { MediaViewerItem } from '@drizztdourden08/tessera';

const Screenshots = ({ shots }: { shots: readonly MediaViewerItem[] }) => {
  const [opened, setOpened] = useState<number | null>(null);
  return (
    <>
      {shots.map((shot, i) => <button key={shot.id} type="button" onClick={() => setOpened(i)}>{shot.name}</button>)}
      <MediaViewer open={opened !== null} items={shots} index={opened ?? 0} onIndexChange={setOpened} onClose={() => setOpened(null)} />
    </>
  );
};
`,
  propsHash: '9e70400d7864e812',
} satisfies ComponentUsage;

export { usage };
