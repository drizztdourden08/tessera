/* @layer renderer-components @kind util */
import { PIXEL_NAME_PREFIX } from './pixel-grid.constants';

const isPixelIconName = (name: string | undefined): boolean => name?.startsWith(PIXEL_NAME_PREFIX) ?? false;

export { isPixelIconName };
