/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { MenuColumnsContext } from '../behavior/menu-columns-context';
import { useMenuFocus } from '../behavior/useMenuFocus';
import { useMenuKeys } from '../behavior/useMenuKeys';
import type { MenuPanelProps } from './MenuPanel.type';
import './MenuPanel.css';

const MenuPanel = (props: MenuPanelProps) => {
  const { id, label, start, columns, onBack, onExit, onTop, onType, children } = props;
  const ownRef = useRef<HTMLElement>(null);
  const menuRef = props.menuRef ?? ownRef;
  const onKeyDown = useMenuKeys({ menuRef, onBack, onExit, onTop, onType });
  useMenuFocus(menuRef, start);

  return (
    <Box
      ref={menuRef}
      id={id}
      role="menu"
      aria-label={label}
      aria-orientation="vertical"
      tabIndex={-1}
      className="dropdown__menu"
      onKeyDown={onKeyDown}
    >
      <MenuColumnsContext value={columns}>{children}</MenuColumnsContext>
    </Box>
  );
};

export { MenuPanel };
