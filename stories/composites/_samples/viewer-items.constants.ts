/* @layer stories @kind data */
import { HERO_SAMPLE_URLS } from './hero-sample-urls.constants';
import { VIDEO_CLIP, VIDEO_POSTER } from './video-clip';
import { STORE_SAMPLES } from './store-samples.constants';
import type { MediaViewerItem } from '../../../src/composites';

const SPRITE_ITEM: MediaViewerItem = { id: 'night-sky', kind: 'image', src: HERO_SAMPLE_URLS.night, name: 'night-sky-sprite.png' };

const VIDEO_ITEM: MediaViewerItem = { id: 'clip', kind: 'video', src: VIDEO_CLIP, poster: VIDEO_POSTER, name: 'boss-fight.webm' };

const PACK_ITEMS: readonly MediaViewerItem[] = [
  ...STORE_SAMPLES.map((item): MediaViewerItem => ({ id: item.id, kind: 'image', src: item.picture, name: item.name })),
  SPRITE_ITEM,
  VIDEO_ITEM,
];

export { PACK_ITEMS, SPRITE_ITEM };
