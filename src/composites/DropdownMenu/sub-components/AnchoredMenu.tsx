/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Floating } from '../../../primitives/Floating';
import { useDismissListeners } from '../../../primitives/Portal';
import { closeMenu } from '../behavior/close-menu';
import { menuClasses } from '../behavior/menu-classes';
import { menuLookClass } from '../behavior/menu-look-class';
import { menuStart } from '../behavior/menu-start';
import { tidyGroups } from '../behavior/tidy-groups';
import { useFocusReturn } from '../behavior/useFocusReturn';
import { useMenuAnchor } from '../behavior/useMenuAnchor';
import { MenuRoot } from './MenuRoot';
import type { AnchoredMenuProps } from '../DropdownMenu.type';

const ignore = (): void => undefined;

const AnchoredMenu = (props: AnchoredMenuProps) => {
  const { groups, anchorRef, side, align, inline = false, label, variant = 'primary', intensity = 'strong', itemSize } = props;
  const { closeOnSelect = true, filter = false, filterPlaceholder, focusOnOpen, hover, onClose = ignore, className } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const look = menuLookClass(variant, intensity, itemSize);
  const { anchor, placement, fallback } = useMenuAnchor({ anchorRef, side, align, inline, onOutOfView: onClose });
  useFocusReturn(menuRef, anchor);
  useDismissListeners({ open: !inline, onClose, contentRef: menuRef, triggerRef: anchor, level: 'menu' });

  const body = (
    <MenuRoot
      groups={tidyGroups(groups)}
      label={label}
      start={menuStart(inline, focusOnOpen)}
      closeOnSelect={closeOnSelect}
      look={look}
      filter={filter}
      filterPlaceholder={filterPlaceholder}
      hover={hover}
      onClose={() => closeMenu(onClose, anchor.current)}
    />
  );
  const classes = menuClasses(look, inline, className);

  if (inline) return <Floating ref={menuRef} className={classes}>{body}</Floating>;
  return (
    <Anchored ref={menuRef} anchorRef={anchor} placement={placement} layer="overlay" fallback={fallback} className={classes}>
      {body}
    </Anchored>
  );
};

export { AnchoredMenu };
