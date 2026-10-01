/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { SUB_MENU_PADDING, SUB_MENU_WIDTH, SUB_ROW_HEIGHT } from '../DropdownMenu.constants';
import { MenuItemBody } from './MenuItemBody';
import { MenuNodes } from './MenuNodes';
import { MenuPanel } from './MenuPanel';
import type { MenuFocusStart } from '../behavior/menu-context.type';
import type { PanelPosition, SubMenuProps } from './SubMenu.type';

const panelPositionFor = (rect: DOMRect, view: Window, rows: number): PanelPosition => ({
  top: Math.min(rect.top, view.innerHeight - (rows * SUB_ROW_HEIGHT + SUB_MENU_PADDING)),
  left: rect.right + SUB_MENU_WIDTH > view.innerWidth ? rect.left - SUB_MENU_WIDTH : rect.right,
});

const SubMenu = (props: SubMenuProps) => {
  const { item, nodes } = props;
  const ref = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [start, setStart] = useState<MenuFocusStart | null>(null);
  const [position, setPosition] = useState<PanelPosition | null>(null);

  const show = (from: MenuFocusStart): void => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPosition(panelPositionFor(rect, ownerWindowOf(ref.current), nodes.length));
    setStart(from);
  };
  const back = (): void => {
    setStart(null);
    triggerRef.current?.focus();
  };
  const leave = (): void => {
    if (!ref.current?.contains(ownerDocumentOf(ref.current).activeElement)) setStart(null);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key !== 'ArrowRight') return;
    event.preventDefault();
    event.stopPropagation();
    show('first');
  };

  return (
    <Box ref={ref} className="dropdown__submenu-trigger" onMouseEnter={() => show('none')} onMouseLeave={leave}>
      <Pressable
        ref={triggerRef}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={start !== null}
        tabIndex={-1}
        className="dropdown__item dropdown__item--parent focus-ring-inset"
        disabled={item.disabled}
        onClick={() => show('first')}
        onKeyDown={onKeyDown}
      >
        <MenuItemBody item={item} trail={<Span className="dropdown__chevron"><Glyph name="chevronRight" size={12} /></Span>} />
      </Pressable>
      {start !== null && (
        <Anchored anchorRef={ref} placement="right-start" portal={false} fallback={position} className="dropdown-menu dropdown-menu--sub">
          <MenuPanel label={item.label} start={start} onBack={back}>
            <MenuNodes nodes={nodes} />
          </MenuPanel>
        </Anchored>
      )}
    </Box>
  );
};

export { SubMenu };
