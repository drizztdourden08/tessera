/* @layer renderer-components @kind logic */
import type { BrandInfo } from '../../brand.type';
import { ICON_MARK_SCALE, TILE_SCALE } from '../BrandMark.constants';
import type { BrandMarkSize, BrandMarkVariant } from '../BrandMark.type';
import { markDetail } from './mark-detail';
import type { TileFace } from './tile-face.type';

const tileFace = (brand: BrandInfo, variant: BrandMarkVariant, twin: boolean, size: BrandMarkSize): TileFace => {
  const tile = variant === 'app-icon' && brand.appIcon === 'tile';
  if (tile && brand.iconMark) return { tile, drawn: markDetail(brand.iconMark, size), scale: ICON_MARK_SCALE };
  const mark = twin && brand.twin ? brand.twin : brand.mark;
  return { tile, drawn: markDetail(mark, size), scale: TILE_SCALE };
};

export { tileFace };
