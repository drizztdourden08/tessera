/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Floating } from '../../../primitives/Floating';
import { Glyph } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { SUB_MENU_PADDING, SUB_MENU_WIDTH, SUB_ROW_HEIGHT } from '../DropdownMenu.constants';
import { MenuItemButton } from './MenuItemButton';
import type { PanelPosition, SubMenuProps } from './SubMenu.type';

const panelPositionFor = (rect: DOMRect, rows: number): PanelPosition => ({
  top: Math.min(rect.top, window.innerHeight - (rows * SUB_ROW_HEIGHT + SUB_MENU_PADDING)),
  left: rect.right + SUB_MENU_WIDTH > window.innerWidth ? rect.left - SUB_MENU_WIDTH : rect.right,
});

const SubMenu = (props: SubMenuProps) => {
  const { item } = props;
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const children = item.children ?? [];

  const handleEnter = (): void => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPosition(panelPositionFor(rect, children.length));
  };

  return (
    <Box
      ref={ref}
      className="dropdown__submenu-trigger"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setPosition(null)}
    >
      <Box className="dropdown__item dropdown__item--parent">
        {item.icon && <Text className="dropdown__icon">{item.icon}</Text>}
        <Text className="dropdown__label">{item.label}</Text>
        <Text className="dropdown__chevron"><Glyph name="chevronRight" size={12} /></Text>
      </Box>
      {position && (
        <Floating className="dropdown-menu dropdown-menu--sub" placement={position}>
          {children.map((child) => (
            child.children
              ? <SubMenu key={child.key} item={child} />
              : <MenuItemButton key={child.key} item={child} />
          ))}
        </Floating>
      )}
    </Box>
  );
};

export { SubMenu };
