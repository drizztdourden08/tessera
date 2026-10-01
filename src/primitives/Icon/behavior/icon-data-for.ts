/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import type { IconSet, IconSource } from '../Icon.type';

const iconDataFor = (source: IconSource, set: IconSet): IconifyIcon => source.icon ?? set[source.name];

export { iconDataFor };
