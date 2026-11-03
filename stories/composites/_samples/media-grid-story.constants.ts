/* @layer stories @kind data */
import type { MediaGridItem, MediaViewerItem } from '../../../src/composites';
import { STORE_SAMPLES } from './store-samples.constants';

const GRID_SOURCES = ['I-12 description', 'I-12 comment', 'I-31 description', 'I-40 comment'];

const GRID_ITEMS: readonly MediaGridItem[] = STORE_SAMPLES.map((sample, index) => ({
  src: sample.picture,
  caption: `${sample.name}.png`,
  source: GRID_SOURCES[index],
}));

const GRID_VIEWER_ITEMS: readonly MediaViewerItem[] = STORE_SAMPLES.map((sample) => ({
  id: sample.id,
  kind: 'image',
  src: sample.picture,
  name: `${sample.name}.png`,
}));

const BROKEN_ITEMS: readonly MediaGridItem[] = [
  ...GRID_ITEMS.slice(0, 2),
  { src: 'missing-picture.png', caption: 'missing-picture.png', source: 'I-18 comment' },
];

const GRID_TEXT = {
  empty: 'No pictures yet',
  emptyHint: 'Paste or drop a picture into a description to see it here.',
  listName: 'Pictures',
};

const GRID_CODE = `import { MediaGrid, MediaViewer } from '@drizztdourden08/tessera';

<MediaGrid
  items={shots.map((shot) => ({ src: shot.url, caption: shot.name, source: shot.item }))}
  onOpen={setOpened}
/>
<MediaViewer
  open={opened !== null}
  items={shots.map((shot) => ({ id: shot.id, kind: 'image', src: shot.url, name: shot.name }))}
  index={opened ?? 0}
  onIndexChange={setOpened}
  onClose={() => setOpened(null)}
/>`;

export { BROKEN_ITEMS, GRID_CODE, GRID_ITEMS, GRID_TEXT, GRID_VIEWER_ITEMS };
