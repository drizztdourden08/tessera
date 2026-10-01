/* @layer renderer-components @kind component */
import { tidyNodes } from '../behavior/tidy-nodes';
import { MenuItemButton } from './MenuItemButton';
import { SubMenu } from './SubMenu';
import type { MenuEntryProps } from './MenuEntry.type';

const MenuEntry = (props: MenuEntryProps) => {
  const { item } = props;
  const children = tidyNodes(item.children ?? []);
  return children.length > 0 ? <SubMenu item={item} nodes={children} /> : <MenuItemButton item={item} />;
};

export { MenuEntry };
