/* @layer renderer-components @kind logic */
import type { BrandInfo } from '../../brand.type';
import { ICON_MARK_SCALE, TILE_SCALE } from '../BrandMark.constants';
import type { TileFace } from './tile-face.type';

const tileFace = (brand: BrandInfo, tile: boolean, twin: boolean): TileFace => (tile && brand.iconMark
  ? { drawn: brand.iconMark, scale: ICON_MARK_SCALE }
  : { drawn: twin && brand.twin ? brand.twin : brand.mark, scale: TILE_SCALE });

export { tileFace };
