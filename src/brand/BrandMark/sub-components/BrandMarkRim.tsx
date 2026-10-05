/* @layer renderer-components @kind component */
import { BrandRimPaths } from '../../BrandRimPaths';
import { tilePath } from '../behavior/tile-path';
import { TILE_RADIUS } from '../BrandMark.constants';
import type { BrandMarkRimProps } from './BrandMarkRim.type';

const BrandMarkRim = (props: BrandMarkRimProps) => {
  const { rim, paths, box, tile, pixelArt, fine } = props;
  if (rim === 'none') return null;
  const outline = tile ? [{ d: tilePath(box, box.w * TILE_RADIUS) }] : paths;
  return <BrandRimPaths tone={rim} paths={outline} pixelArt={pixelArt === true && !tile} fine={fine} />;
};

export { BrandMarkRim };
