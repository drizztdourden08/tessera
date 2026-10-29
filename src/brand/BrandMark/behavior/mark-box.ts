/* @layer renderer-components @kind logic */
import type { BrandMarkFit } from '../BrandMark.type';
import { parseViewBox } from './parse-view-box';
import type { ViewBoxRect } from './parse-view-box.type';
import { squareBox } from './square-box';

const markBox = (viewBox: string, fit: BrandMarkFit, tile: boolean): ViewBoxRect =>
  fit === 'height' && !tile ? parseViewBox(viewBox) : squareBox(viewBox);

export { markBox };
