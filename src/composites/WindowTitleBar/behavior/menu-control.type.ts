/* @layer renderer-components @kind types */
import type { IconName } from '../../../primitives/Icon';
import type { WindowTitleBarTucked } from '../WindowTitleBar.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';

type MenuControl = keyof WindowTitleBarTucked;

interface MenuControlRow {
  icon: IconName;
  label: keyof TitleBarMenuInput['strings'];
}

export type { MenuControl, MenuControlRow };
