/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Floating } from '../../../primitives/Floating';
import { useDismissListeners } from '../../../primitives/Portal';
import { closeMenu } from '../behavior/close-menu';
import { menuLookClass } from '../behavior/menu-look-class';
import { tidyGroups } from '../behavior/tidy-groups';
import { useFocusReturn } from '../behavior/useFocusReturn';
import { useMenuAnchor } from '../behavior/useMenuAnchor';
import { MenuRoot } from './MenuRoot';
import type { AnchoredMenuProps } from '../DropdownMenu.type';

const ignore = (): void => undefined;

const AnchoredMenu = (props: AnchoredMenuProps) => {
  const { groups, anchorRef, side, align, inline = false, label, variant = 'primary', intensity = 'strong' } = props;
  const { closeOnSelect = true, filter = false, filterPlaceholder, onClose = ignore, className } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const look = menuLookClass(variant, intensity);
  const { anchor, placement, fallback } = useMenuAnchor({ anchorRef, side, align, inline, onOutOfView: onClose });
  useFocusReturn(menuRef, anchor);
  useDismissListeners({ open: !inline, onClose, contentRef: menuRef, triggerRef: anchor, level: 'menu' });

  const body = (
    <MenuRoot
      groups={tidyGroups(groups)}
      label={label}
      start={inline ? 'none' : 'first'}
      closeOnSelect={closeOnSelect}
      look={look}
      filter={filter}
      filterPlaceholder={filterPlaceholder}
      onClose={() => closeMenu(onClose, anchor.current)}
    />
  );
  const classes = ['dropdown-menu', 'dropdown-surface', look, inline && 'dropdown-menu--inline', className]
    .filter(Boolean).join(' ');

  if (inline) return <Floating ref={menuRef} className={classes}>{body}</Floating>;
  return (
    <Anchored ref={menuRef} anchorRef={anchor} placement={placement} layer="overlay" fallback={fallback} className={classes}>
      {body}
    </Anchored>
  );
};

export { AnchoredMenu };
