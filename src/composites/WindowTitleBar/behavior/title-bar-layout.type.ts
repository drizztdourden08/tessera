/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu';
import type { BrandFit, WindowControlsConfig, WindowTitleBarAction } from '../WindowTitleBar.type';

interface TitleBarLayout {
  groups: MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  controls: WindowControlsConfig;
  hidden: ReadonlySet<string>;
  brand: BrandFit;
}

export type { TitleBarLayout };
