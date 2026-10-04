/* @layer renderer-components @kind component */
import { useCallback, useId, useRef, useState } from 'react';
import { IconButton } from '../../../primitives/IconButton';
import { DropdownMenu } from '../../DropdownMenu';
import { useMenuDismiss } from '../behavior/useMenuDismiss';
import { useMenuInView } from '../behavior/useMenuInView';
import type { WidgetMenuProps } from './WidgetMenu.type';

const WidgetMenu = (props: WidgetMenuProps) => {
  const { label, menuLabel, icon, groups, lit = false, className } = props;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuClass = `widget-menu-${useId()}`;
  const close = useCallback(() => setOpen(false), []);
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
        onClick={() => setOpen(!open)}
      >
        {icon}
      </IconButton>
      {open && (
        <DropdownMenu
          groups={groups}
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
