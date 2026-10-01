/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Floating } from '../../../primitives/Floating';
import { tidyGroups } from '../behavior/tidy-groups';
import { useFocusReturn } from '../behavior/useFocusReturn';
import { useMenuAnchor } from '../behavior/useMenuAnchor';
import { MenuRoot } from './MenuRoot';
import type { AnchoredMenuProps } from '../DropdownMenu.type';

const ignore = (): void => undefined;

const AnchoredMenu = (props: AnchoredMenuProps) => {
  const { groups, anchorRef, side, align, inline = false, label, closeOnSelect = true, onClose = ignore, className } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const { anchor, placement, fallback } = useMenuAnchor({ anchorRef, side, align, inline });
  useFocusReturn(menuRef, anchor);

  const body = (
    <MenuRoot groups={tidyGroups(groups)} label={label} start={inline ? 'none' : 'first'} closeOnSelect={closeOnSelect} onClose={onClose} />
  );
  const classes = ['dropdown-menu', inline && 'dropdown-menu--inline', className].filter(Boolean).join(' ');

  if (inline) return <Floating ref={menuRef} className={classes}>{body}</Floating>;
  return (
    <Anchored ref={menuRef} anchorRef={anchor} placement={placement} layer="overlay" fallback={fallback} className={classes}>
      {body}
    </Anchored>
  );
};

export { AnchoredMenu };
