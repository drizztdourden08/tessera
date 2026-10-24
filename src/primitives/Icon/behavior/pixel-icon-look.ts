/* @layer renderer-components @kind logic */
import type { IconLook } from '../Icon.type';
import { PIXEL_DEFAULT_SIZE, PIXEL_GRID_SIZE } from './pixel-grid.constants';
import { pixelIconSize } from './pixel-icon-size';

const pixelIconLook = (look: IconLook): IconLook => {
  const wanted = Number.parseFloat(String(look.size ?? PIXEL_DEFAULT_SIZE));
  const size = pixelIconSize(Number.isFinite(wanted) ? wanted : PIXEL_GRID_SIZE);
  return { ...look, size, className: look.className ? `icon--pixel ${look.className}` : 'icon--pixel' };
};

export { pixelIconLook };
