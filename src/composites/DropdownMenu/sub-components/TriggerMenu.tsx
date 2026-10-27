/* @layer renderer-components @kind component */
import { useId, useMemo, useState } from 'react';
import { ListboxPanel } from '../../../primitives/listbox/ListboxPanel';
import { useListboxDrop } from '../../../primitives/listbox/useListboxDrop';
import { closeMenu } from '../behavior/close-menu';
import { useHoverOpen } from '../behavior/useHoverOpen';
import { menuLookClass } from '../behavior/menu-look-class';
import { menuPanelSize } from '../behavior/menu-panel-size';
import { tidyGroups } from '../behavior/tidy-groups';
import { triggerAttributes } from '../behavior/trigger-attributes';
import { triggerKeys } from '../behavior/trigger-keys';
import { triggerSettings } from '../behavior/trigger-settings';
import { useReport } from '../../../primitives/dom/useReport';
import { MenuRoot } from './MenuRoot';
import { MenuTriggerButton } from './MenuTriggerButton';
import type { MenuFocusStart } from '../behavior/menu-context.type';
import type { TriggerMenuProps } from '../DropdownMenu.type';
import '../../../theme/listbox-drop.css';
import '../../../theme/dropdown-trigger.css';

const TriggerMenu = (props: TriggerMenuProps) => {
  const { groups, trigger, label, filterPlaceholder, onOpenChange, className } = props;
  const { variant, intensity, size, align, disabled, closeOnSelect, filter, openOnHover } = triggerSettings(props);
  const menuId = useId();
  const [start, setStart] = useState<MenuFocusStart>('first');
  const [query, setQuery] = useState('');
  const shown = tidyGroups(groups);
  const contentKey = useMemo(() => ({ groups, query }), [groups, query]);
  const drop = useListboxDrop<HTMLButtonElement>({ disabled: disabled || shown.length === 0, contentKey, level: 'menu', fit: true, align });
  useReport(drop.open, onOpenChange);
  const openAt = (from: MenuFocusStart): void => {
    setStart(from);
    setQuery('');
    drop.show();
  };
  const hover = useHoverOpen({ open: drop.open, byHover: start === 'none', anchorRef: drop.anchorRef, enabled: openOnHover && !disabled, onOpen: () => openAt('none'), onClose: drop.close });
  if (shown.length === 0) return null;
  const look = menuLookClass(variant, intensity, props.itemSize);

  return (
    <>
      <MenuTriggerButton
        buttonRef={drop.anchorRef}
        trigger={trigger}
        variant={variant}
        size={size}
        disabled={disabled}
        className={['dropdown-trigger listbox-anchor', look, className].filter(Boolean).join(' ')}
        {...triggerAttributes(drop, menuId)}
        onClick={() => (drop.open ? drop.close() : openAt('first'))}
        onKeyDown={triggerKeys(drop.open, openAt)}
        {...(openOnHover ? hover : {})}
      />
      {drop.open && (
        <ListboxPanel drop={drop} invalid={false} size={menuPanelSize(size)} className={`dropdown-drop dropdown-surface ${look}`}>
          <MenuRoot
            id={menuId}
            groups={shown}
            label={label ?? trigger.label}
            start={start}
            closeOnSelect={closeOnSelect}
            look={look}
            filter={filter}
            filterPlaceholder={filterPlaceholder}
            hover={openOnHover ? hover : undefined}
            onClose={() => closeMenu(drop.close, drop.anchorRef.current)}
            onQueryChange={setQuery}
          />
        </ListboxPanel>
      )}
    </>
  );
};

export { TriggerMenu };
