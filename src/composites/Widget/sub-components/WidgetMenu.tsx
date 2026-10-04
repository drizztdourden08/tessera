/* @layer renderer-components @kind component */
import { useCallback, useId, useRef, useState } from 'react';
import { IconButton } from '../../../primitives/IconButton';
import { DropdownMenu } from '../../DropdownMenu';
import { fitsSubMenus } from '../behavior/fits-sub-menus';
import { flatMenu } from '../behavior/flat-menu';
import { useMenuDismiss } from '../behavior/useMenuDismiss';
import { useMenuInView } from '../behavior/useMenuInView';
import type { WidgetMenuProps } from './WidgetMenu.type';

const WidgetMenu = (props: WidgetMenuProps) => {
  const { label, menuLabel, icon, groups, lit = false, className } = props;
  const [open, setOpen] = useState(false);
  const [flat, setFlat] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuClass = `widget-menu-${useId()}`;
  const close = useCallback(() => setOpen(false), []);
  const toggle = (trigger: HTMLElement): void => {
    const view = trigger.ownerDocument.defaultView;
    setFlat(view !== null && !fitsSubMenus(trigger.getBoundingClientRect(), view.innerWidth));
    setOpen(!open);
  };
  useMenuDismiss({ open, triggerRef, onClose: close });
  useMenuInView(open, triggerRef, menuClass);

  return (
    <>
      <IconButton
        ref={triggerRef}
        className={['widget__btn', className].filter(Boolean).join(' ')}
        label={label}
        title={label}
        active={open || lit}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => toggle(e.currentTarget)}
      >
        {icon}
      </IconButton>
      {open && (
        <DropdownMenu
          groups={flat ? flatMenu(groups) : groups}
          anchorRef={triggerRef}
          side="below"
          align="end"
          label={menuLabel}
          onClose={close}
          className={`widget-menu ${menuClass}`}
        />
      )}
    </>
  );
};

export { WidgetMenu };
