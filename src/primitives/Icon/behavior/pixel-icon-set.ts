/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import type { PixelGrid } from '../Icon.type';
import { pixelGridIcon } from './pixel-grid-icon';

const pixelIconSet = <Name extends string>(grids: Readonly<Record<Name, PixelGrid>>): Readonly<Record<Name, IconifyIcon>> =>
  Object.fromEntries(Object.entries<PixelGrid>(grids).map(([name, grid]) => [name, pixelGridIcon(grid)])) as Record<Name, IconifyIcon>;

export { pixelIconSet };
