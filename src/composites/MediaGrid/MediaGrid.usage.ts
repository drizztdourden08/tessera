/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A grid of picture thumbnails, each with a caption and a small tag for where it came from, that opens a picture when one is clicked.',
  useWhen: [
    'The user browses the pictures of a record or of a whole project and opens one large.',
    'Each picture needs a caption and a source, such as the item it was attached to.',
  ],
  avoidWhen: [
    { case: 'One picture opens large from a small preview inside a form or a file pane.', use: 'MediaViewer' },
    { case: 'One slide at a time is shown, with dots or arrows.', use: 'Carousel' },
    { case: 'The pictures are catalogue items with a price, a rating or actions.', use: 'ItemCard' },
  ],
  rules: [
    'Pass items as src, caption and source; source is optional and draws as a small tag under the caption.',
    'onOpen gets the index of the clicked thumbnail; open MediaViewer at that index with the same pictures to give zoom and arrows.',
    'Leave columns out to fit as many 160 pixel columns as the width allows; pass columns for a fixed count.',
    'Pass empty to draw something, such as an EmptyState, when items is empty; without it nothing is drawn.',
    'A thumbnail shows a placeholder while it loads and a broken picture mark when its src fails, and stays clickable.',
    'Pass aria-label to name the list for a screen reader.',
  ],
  a11y: [
    'The grid is a list and each thumbnail is a button named Open with its caption.',
    'The thumbnails are in the tab order and show a focus ring.',
  ],
  tree: {
    path: ['data', 'a picture or a video', 'a small framed picture'],
    rule: 'MediaGrid shows many pictures as thumbnails that each open large, in the same way in every app.',
  },
  example: `import { useState } from 'react';
import { MediaGrid, MediaViewer } from '@drizztdourden08/tessera';

const MediaTab = ({ shots }: { shots: { id: string; url: string; name: string; item: string }[] }) => {
  const [opened, setOpened] = useState<number | null>(null);
  return (
    <>
      <MediaGrid items={shots.map((shot) => ({ src: shot.url, caption: shot.name, source: shot.item }))} onOpen={setOpened} />
      <MediaViewer
        open={opened !== null}
        items={shots.map((shot) => ({ id: shot.id, kind: 'image', src: shot.url, name: shot.name }))}
        index={opened ?? 0}
        onIndexChange={setOpened}
        onClose={() => setOpened(null)}
      />
    </>
  );
};
`,
  propsHash: 'd3d5ffeda6dce563',
} satisfies ComponentUsage;

export { usage };
