/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import { ICONS } from '../icons.constants';
import type { IconSource } from '../Icon.type';

const iconDataFor = (source: IconSource): IconifyIcon => source.icon ?? ICONS[source.name];

export { iconDataFor };
