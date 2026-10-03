/* @layer renderer-components @kind component */
import { HighlightedText } from '../../../primitives/listbox/HighlightedText';
import { Span } from '../../../primitives/text-elements';
import { PATH_JOIN } from '../DropdownMenu.constants';
import { MenuIcon } from './MenuIcon';
import type { MenuItemBodyProps } from './MenuItemBody.type';

const MenuItemBody = (props: MenuItemBodyProps) => {
  const { item, mark, end, query, path } = props;
  const subtitle = path && path.length > 0 ? path.join(PATH_JOIN) : item.description;
  return (
    <>
      {mark}
      <MenuIcon icon={item.icon} />
      <Span className="dropdown__label">{query ? <HighlightedText text={item.label} query={query} /> : item.label}</Span>
      {subtitle && <Span className="dropdown__description">{subtitle}</Span>}
      {end}
    </>
  );
};

export { MenuItemBody };
