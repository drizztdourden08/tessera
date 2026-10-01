/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { MenuIcon } from './MenuIcon';
import type { MenuItemBodyProps } from './MenuItemBody.type';

const MenuItemBody = (props: MenuItemBodyProps) => {
  const { item, trail } = props;
  return (
    <>
      {item.icon !== undefined && <MenuIcon icon={item.icon} />}
      <Span className="dropdown__text">
        <Span className="dropdown__label">{item.label}</Span>
        {item.description && <Span className="dropdown__description">{item.description}</Span>}
      </Span>
      {trail}
    </>
  );
};

export { MenuItemBody };
