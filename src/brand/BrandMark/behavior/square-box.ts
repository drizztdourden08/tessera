/* @layer renderer-components @kind logic */
import { parseViewBox } from './parse-view-box';
import type { ViewBoxRect } from './parse-view-box.type';

const squareBox = (viewBox: string): ViewBoxRect => {
  const { x, y, w, h } = parseViewBox(viewBox);
  const side = Math.max(w, h);
  return { x: x - (side - w) / 2, y: y - (side - h) / 2, w: side, h: side };
};

export { squareBox };
