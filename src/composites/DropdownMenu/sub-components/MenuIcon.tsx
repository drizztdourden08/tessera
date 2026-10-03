/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import { MenuColumnsContext } from '../behavior/menu-columns-context';
import type { MenuIconProps } from './MenuIcon.type';

const MenuIcon = (props: MenuIconProps) => {
  const { icon } = props;
  const { icons } = useContext(MenuColumnsContext);
  if (icon === undefined && !icons) return null;
  return (
    <Span className="dropdown__icon" aria-hidden="true">
      {typeof icon === 'string' ? <Icon name={icon} /> : icon}
    </Span>
  );
};

export { MenuIcon };
