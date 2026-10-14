/* @layer stories @kind data */
import { HERO_SAMPLE_URLS } from '../../../composites/_samples/hero-sample-urls.constants';
import { VIDEO_CLIP, VIDEO_POSTER } from '../../../composites/_samples/video-clip';
import { STORE_SAMPLES } from '../../_shared/store-samples.constants';
import type { MediaViewerItem } from '../MediaViewer.type';

const SPRITE_ITEM: MediaViewerItem = { id: 'night-sky', kind: 'image', src: HERO_SAMPLE_URLS.night, name: 'night-sky-sprite.png' };

const VIDEO_ITEM: MediaViewerItem = { id: 'clip', kind: 'video', src: VIDEO_CLIP, poster: VIDEO_POSTER, name: 'boss-fight.webm' };

const PACK_ITEMS: readonly MediaViewerItem[] = [
  ...STORE_SAMPLES.map((item): MediaViewerItem => ({ id: item.id, kind: 'image', src: item.picture, name: item.name })),
  SPRITE_ITEM,
  VIDEO_ITEM,
];

export { PACK_ITEMS, SPRITE_ITEM };
