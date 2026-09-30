/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Anchored } from '../../../primitives/Anchored';
import { Glyph } from '../../../primitives/Glyph';
import { Span } from '../../../primitives/text-elements';
import { SUB_MENU_PADDING, SUB_MENU_WIDTH, SUB_ROW_HEIGHT } from '../DropdownMenu.constants';
import { MenuItemButton } from './MenuItemButton';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { PanelPosition, SubMenuProps } from './SubMenu.type';

const panelPositionFor = (rect: DOMRect, view: Window, rows: number): PanelPosition => ({
  top: Math.min(rect.top, view.innerHeight - (rows * SUB_ROW_HEIGHT + SUB_MENU_PADDING)),
  left: rect.right + SUB_MENU_WIDTH > view.innerWidth ? rect.left - SUB_MENU_WIDTH : rect.right,
});

const SubMenu = (props: SubMenuProps) => {
  const { item } = props;
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const children = item.children ?? [];

  const handleEnter = (): void => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPosition(panelPositionFor(rect, ownerWindowOf(ref.current), children.length));
  };

  return (
    <Box
      ref={ref}
      className="dropdown__submenu-trigger"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setPosition(null)}
    >
      <Box className="dropdown__item dropdown__item--parent">
        {item.icon && <Span className="dropdown__icon">{item.icon}</Span>}
        <Span className="dropdown__label">{item.label}</Span>
        <Span className="dropdown__chevron"><Glyph name="chevronRight" size={12} /></Span>
      </Box>
      {position && (
        <Anchored anchorRef={ref} placement="right-start" portal={false} fallback={position} className="dropdown-menu dropdown-menu--sub">
          {children.map((child) => (
            child.children
              ? <SubMenu key={child.key} item={child} />
              : <MenuItemButton key={child.key} item={child} />
          ))}
        </Anchored>
      )}
    </Box>
  );
};

export { SubMenu };
