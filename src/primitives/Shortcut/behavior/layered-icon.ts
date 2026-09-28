/* @layer renderer-components @kind util */
import type { IconifyIcon } from '@iconify/types';
import type { LayeredIconParams } from './layered-icon.type';

const pathTag = (d: string, className: string): string => `<path class="${className}" fill="currentColor" d="${d}"/>`;

const layeredIcon = (params: LayeredIconParams): IconifyIcon => {
  const { base, press = [], width = 256 } = params;
  const paths = [...base.map((d) => pathTag(d, 'shortcut__base')), ...press.map((d) => pathTag(d, 'shortcut__press'))];
  return { width, height: 256, body: paths.join('') };
};

export { layeredIcon };
