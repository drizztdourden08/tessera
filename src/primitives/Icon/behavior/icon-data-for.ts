/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import type { IconSet, IconSource } from '../Icon.type';
import { pathIconData } from './path-icon-data';

const iconDataFor = (source: IconSource, set: IconSet): IconifyIcon => {
  if (source.path !== undefined) return pathIconData(source.path);
  return source.icon ?? set[source.name];
};

export { iconDataFor };
