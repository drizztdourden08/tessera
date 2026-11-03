/* @layer renderer-components @kind data */
import type { BrandMarkDetailLevel } from '../brand.type';
import type { BrandMarkSize } from './BrandMark.type';

const TILE_SCALE = 0.72;

const ICON_MARK_SCALE = 0.86;

const TILE_RADIUS = 0.2;

const MARK_DETAIL: Readonly<Record<BrandMarkSize, BrandMarkDetailLevel | null>> = {
  sm: 'small',
  md: 'medium',
  lg: null,
  xl: null,
  xxl: null,
  h26: 'medium',
  h39: 'medium',
  fill: null,
};

export { ICON_MARK_SCALE, MARK_DETAIL, TILE_RADIUS, TILE_SCALE };
