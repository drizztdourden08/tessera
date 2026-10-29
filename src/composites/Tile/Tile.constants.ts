/* @layer renderer-components @kind data */
import type { TileCorner } from './Tile.type';

const TILE_CORNERS: readonly TileCorner[] = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'];

const TILE_CORNER_CLASS: Readonly<Record<TileCorner, string>> = {
  topStart: 'top-start',
  topEnd: 'top-end',
  bottomStart: 'bottom-start',
  bottomEnd: 'bottom-end',
};

const MEDIA_ASPECT_PROPERTY = '--tile-media-aspect';

export { MEDIA_ASPECT_PROPERTY, TILE_CORNER_CLASS, TILE_CORNERS };
