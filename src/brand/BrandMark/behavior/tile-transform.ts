/* @layer renderer-components @kind logic */
import { TILE_SCALE } from '../BrandMark.constants';
import type { ViewBoxRect } from './parse-view-box.type';

const tileTransform = ({ x, y, w, h }: ViewBoxRect, scale: number = TILE_SCALE): string => {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return `translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`;
};

export { tileTransform };
