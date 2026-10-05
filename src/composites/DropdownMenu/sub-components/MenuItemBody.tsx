/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { PATH_JOIN } from '../DropdownMenu.constants';
import { itemKind } from '../behavior/item-kind';
import { MenuIcon } from './MenuIcon';
import { MenuLabel } from './MenuLabel';
import { MenuMark } from './MenuMark';
import type { MenuItemBodyProps } from './MenuItemBody.type';

const MenuItemBody = (props: MenuItemBodyProps) => {
  const { item, end, query, path, ask, asking } = props;
  const subtitle = path && path.length > 0 ? path.join(PATH_JOIN) : item.description;
  return (
    <>
      <MenuMark kind={itemKind(item)} checked={item.checked === true} />
      <MenuIcon icon={item.icon} />
      <MenuLabel item={item} query={query} ask={ask} asking={asking} />
      {subtitle && <Span className="dropdown__description">{subtitle}</Span>}
      {end}
    </>
  );
};

export { MenuItemBody };
