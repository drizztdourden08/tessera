/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Span } from '../../../primitives/text-elements';
import { MenuColumnsContext } from '../behavior/menu-columns-context';
import { MenuIconGlyph } from './MenuIconGlyph';
import type { MenuIconProps } from './MenuIcon.type';

const MenuIcon = (props: MenuIconProps) => {
  const { icon } = props;
  const { icons } = useContext(MenuColumnsContext);
  if (icon === undefined && !icons) return null;
  return (
    <Span className="dropdown__icon" aria-hidden="true">
      {icon !== undefined && <MenuIconGlyph icon={icon} />}
    </Span>
  );
};

export { MenuIcon };
