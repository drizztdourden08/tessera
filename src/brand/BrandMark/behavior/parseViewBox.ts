/* @layer renderer-components @kind logic */
import type { ViewBoxRect } from './parseViewBox.type';

const parseViewBox = (viewBox: string): ViewBoxRect => {
  const [x = 0, y = 0, w = 0, h = 0] = viewBox.split(' ').map(Number);
  return { x, y, w, h };
};

export { parseViewBox };
