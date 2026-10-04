/* @layer renderer-components @kind component */
import { useId, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ListboxPanel } from '../../../primitives/listbox/ListboxPanel';
import { useListboxDrop } from '../../../primitives/listbox/useListboxDrop';
import { closeMenu } from '../behavior/close-menu';
import { menuLookClass } from '../behavior/menu-look-class';
import { tidyGroups } from '../behavior/tidy-groups';
import { triggerAttributes } from '../behavior/trigger-attributes';
import { triggerSettings } from '../behavior/trigger-settings';
import { useOpenReport } from '../behavior/useOpenReport';
import { MenuRoot } from './MenuRoot';
import { MenuTriggerButton } from './MenuTriggerButton';
import type { MenuFocusStart } from '../behavior/menu-context.type';
import type { TriggerMenuProps } from '../DropdownMenu.type';
import '../../../theme/listbox-drop.css';
import '../../../theme/dropdown-trigger.css';

const TriggerMenu = (props: TriggerMenuProps) => {
  const { groups, trigger, label, filterPlaceholder, onOpenChange, className } = props;
  const { variant, intensity, size, disabled, closeOnSelect, filter } = triggerSettings(props);
  const menuId = useId();
  const [start, setStart] = useState<MenuFocusStart>('first');
  const [query, setQuery] = useState('');
  const shown = tidyGroups(groups);
  const contentKey = useMemo(() => ({ groups, query }), [groups, query]);
  const drop = useListboxDrop<HTMLButtonElement>({ disabled: disabled || shown.length === 0, contentKey, escape: false, fit: true });
  useOpenReport(drop.open, onOpenChange);
  if (shown.length === 0) return null;

  const look = menuLookClass(variant, intensity);
  const openAt = (from: MenuFocusStart): void => {
    setStart(from);
    setQuery('');
    drop.show();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (drop.open || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;
    event.preventDefault();
    openAt(event.key === 'ArrowDown' ? 'first' : 'last');
  };

  return (
    <>
      <MenuTriggerButton
        buttonRef={drop.anchorRef}
        trigger={trigger}
        variant={variant}
        size={size}
        open={drop.open}
        disabled={disabled}
        className={['dropdown-trigger listbox-anchor', look, className].filter(Boolean).join(' ')}
        {...triggerAttributes(drop, menuId)}
        onClick={() => (drop.open ? drop.close() : openAt('first'))}
        onKeyDown={onKeyDown}
      />
      {drop.open && (
        <ListboxPanel drop={drop} invalid={false} size={size} className={`dropdown-drop dropdown-surface ${look}`}>
          <MenuRoot
            id={menuId}
            groups={shown}
            label={label ?? trigger.label}
            start={start}
            closeOnSelect={closeOnSelect}
            look={look}
            filter={filter}
            filterPlaceholder={filterPlaceholder}
            onClose={() => closeMenu(drop.close, drop.anchorRef.current)}
            onQueryChange={setQuery}
          />
        </ListboxPanel>
      )}
    </>
  );
};

export { TriggerMenu };
