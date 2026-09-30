/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../primitives/Anchored';
import { useAnchorTracking } from '../../primitives/Portal';
import { Box } from '../../primitives/Box';
import { Floating } from '../../primitives/Floating';
import { MenuItemButton } from './sub-components/MenuItemButton';
import { SubMenu } from './sub-components/SubMenu';
import type { FloatingPlacement } from '../../primitives/Floating';
import type { DropdownMenuProps, MenuAlign, MenuSide } from './DropdownMenu.type';
import '../../theme/focus-ring.css';
import '../../theme/dropdown-menu.css';

const placementOf = (rect: DOMRect, view: Window, side: MenuSide, align: MenuAlign): FloatingPlacement => ({
  ...(side === 'below' ? { top: rect.bottom } : { bottom: view.innerHeight - rect.top }),
  ...(align === 'start' ? { left: rect.left } : { right: view.innerWidth - rect.right }),
});

const DropdownMenu = (props: DropdownMenuProps) => {
  const { items, anchorRef, side = 'below', align = 'start', inline = false } = props;
  const detached = useRef<HTMLElement>(null);

  const { position: pos } = useAnchorTracking({
    active: Boolean(anchorRef) && !inline,
    anchorRef: anchorRef ?? detached,
    compute: (rect, view) => placementOf(rect, view, side, align),
  });

  const entries = items.map((item, i) => {
    if (item === 'separator') return <Box key={`sep-${i}`} className="dropdown__separator" />;
    if (item.children) return <SubMenu key={item.key} item={item} />;
    return <MenuItemButton key={item.key} item={item} />;
  });

  if (inline) return <Floating className="dropdown-menu dropdown-menu--inline">{entries}</Floating>;
  return (
    <Anchored
      anchorRef={anchorRef ?? detached}
      placement={`${side === 'below' ? 'bottom' : 'top'}-${align}`}
      layer="overlay"
      fallback={pos}
      className="dropdown-menu"
    >
      {entries}
    </Anchored>
  );
};

export { DropdownMenu };
