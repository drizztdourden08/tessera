/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { MenuItemBody } from './MenuItemBody';
import { SubMenuPanel } from './SubMenuPanel';
import type { MenuFocusStart } from '../behavior/menu-context.type';
import type { SubMenuProps } from './SubMenu.type';

const SubMenu = (props: SubMenuProps) => {
  const { item, nodes } = props;
  const ref = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const [start, setStart] = useState<MenuFocusStart | null>(null);
  const open = start !== null;

  const back = (): void => {
    setStart(null);
    triggerRef.current?.focus();
  };
  const leave = (): void => {
    const doc = ownerDocumentOf(ref.current);
    if (!doc.getElementById(menuId)?.contains(doc.activeElement)) setStart(null);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key !== 'ArrowRight') return;
    event.preventDefault();
    event.stopPropagation();
    setStart('first');
  };

  return (
    <Box ref={ref} className="dropdown__submenu-trigger" onMouseEnter={() => !item.disabled && setStart(start ?? 'none')} onMouseLeave={leave}>
      <Pressable
        ref={triggerRef}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        tabIndex={-1}
        className="dropdown__item dropdown__item--parent focus-ring-inset"
        disabled={item.disabled}
        onClick={() => setStart('first')}
        onKeyDown={onKeyDown}
      >
        <MenuItemBody item={item} end={<Span className="dropdown__chevron"><Glyph name="chevronRight" size={12} /></Span>} />
      </Pressable>
      {open && <SubMenuPanel id={menuId} anchorRef={ref} label={item.label} start={start} nodes={nodes} onBack={back} />}
    </Box>
  );
};

export { SubMenu };
