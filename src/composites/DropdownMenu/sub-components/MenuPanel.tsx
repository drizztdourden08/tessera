/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { useMenuFocus } from '../behavior/useMenuFocus';
import { useMenuKeys } from '../behavior/useMenuKeys';
import type { MenuPanelProps } from './MenuPanel.type';

const MenuPanel = (props: MenuPanelProps) => {
  const { id, label, start, onBack, onExit, children } = props;
  const menuRef = useRef<HTMLElement>(null);
  const onKeyDown = useMenuKeys({ menuRef, onBack, onExit });
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
      {children}
    </Box>
  );
};

export { MenuPanel };
