/* @layer renderer-components @kind util */
import type { IconName } from '../../../primitives/Icon';
import { DEFAULT_FILE_ICON, EXTENSION_ICONS } from '../FileList.constants';

const fileIcon = (name: string, icon?: IconName): IconName => {
  if (icon) return icon;
  const dot = name.lastIndexOf('.');
  if (dot <= 0) return DEFAULT_FILE_ICON;
  return EXTENSION_ICONS[name.slice(dot + 1).toLowerCase()] ?? DEFAULT_FILE_ICON;
};

export { fileIcon };
