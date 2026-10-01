/* @layer renderer-components @kind component */
import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Pressable } from '../../../primitives/Pressable';
import { ListboxPanel } from '../../../primitives/listbox/ListboxPanel';
import { useListboxDrop } from '../../../primitives/listbox/useListboxDrop';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { tidyGroups } from '../behavior/tidy-groups';
import { useOpenReport } from '../behavior/useOpenReport';
import { HamburgerIcon } from './HamburgerIcon';
import { MenuRoot } from './MenuRoot';
import type { MenuFocusStart } from '../behavior/menu-context.type';
import type { TriggerMenuProps } from '../DropdownMenu.type';
import '../../../theme/listbox-drop.css';
import './MenuButton.css';

const MenuButton = (props: TriggerMenuProps) => {
  const { groups, label, closeOnSelect = true, onOpenChange, className } = props;
  const { navigation } = useTesseraStrings();
  const menuId = useId();
  const [start, setStart] = useState<MenuFocusStart>('first');
  const shown = tidyGroups(groups);
  const drop = useListboxDrop<HTMLButtonElement>({ disabled: shown.length === 0, contentKey: groups, escape: false, fit: true });
  useOpenReport(drop.open, onOpenChange);
  if (shown.length === 0) return null;

  const openAt = (from: MenuFocusStart): void => {
    setStart(from);
    drop.show();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (drop.open || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;
    event.preventDefault();
    openAt(event.key === 'ArrowDown' ? 'first' : 'last');
  };
  const name = label ?? navigation.menu;

  return (
    <>
      <Pressable
        ref={drop.anchorRef}
        className={['menu-button', 'listbox-anchor', className].filter(Boolean).join(' ')}
        aria-label={name}
        aria-haspopup="menu"
        aria-expanded={drop.open}
        aria-controls={drop.open ? menuId : undefined}
        data-drop={drop.open ? drop.attach : undefined}
        data-fillet={(drop.open && drop.fillet) || undefined}
        onClick={() => (drop.open ? drop.close() : openAt('first'))}
        onKeyDown={onKeyDown}
      >
        <HamburgerIcon open={drop.open} />
      </Pressable>
      {drop.open && (
        <ListboxPanel drop={drop} invalid={false} size="sm" className="menu-button__drop">
          <MenuRoot id={menuId} groups={shown} label={name} start={start} closeOnSelect={closeOnSelect} onClose={drop.close} />
        </ListboxPanel>
      )}
    </>
  );
};

export { MenuButton };
