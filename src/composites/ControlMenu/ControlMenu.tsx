/* @layer renderer-components @kind component */
import { useId, useState } from 'react';
import { ListboxPanel } from '../../primitives/listbox/ListboxPanel';
import { useListboxDrop } from '../../primitives/listbox/useListboxDrop';
import { menuLookClass } from '../DropdownMenu/behavior/menu-look-class';
import { useOpenReport } from '../DropdownMenu/behavior/useOpenReport';
import { MenuTriggerButton } from '../DropdownMenu/sub-components/MenuTriggerButton';
import { controlTriggerAttributes } from './behavior/control-trigger-attributes';
import { ControlMenuPanel } from './sub-components/ControlMenuPanel';
import type { ControlMenuProps } from './ControlMenu.type';
import '../../theme/focus-ring.css';
import '../../theme/dropdown-menu.css';
import '../../theme/listbox-drop.css';
import '../../theme/dropdown-look.css';
import '../../theme/dropdown-trigger.css';
import '../../theme/dropdown-sub-menu.css';
import './ControlMenu.css';

const ControlMenu = (props: ControlMenuProps) => {
  const { trigger, children, label, header, filter = false, filterPlaceholder, hints = true, align = 'auto' } = props;
  const { variant = 'primary', intensity = 'strong', size = 'sm', disabled = false, defaultOpen, onOpenChange, className, triggerClassName } = props;
  const panelId = useId();
  const [query, setQuery] = useState('');
  const drop = useListboxDrop<HTMLButtonElement>({ disabled, defaultOpen, contentKey: query, escape: true, fit: true, align });
  useOpenReport(drop.open, onOpenChange);
  const look = menuLookClass(variant, intensity);
  const show = (): void => {
    setQuery('');
    drop.show();
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
        className={['dropdown-trigger listbox-anchor control-menu__trigger', look, triggerClassName].filter(Boolean).join(' ')}
        {...controlTriggerAttributes(drop, panelId)}
        onClick={() => (drop.open ? drop.close() : show())}
      />
      {drop.open && (
        <ListboxPanel drop={drop} invalid={false} size={size} className={['dropdown-drop dropdown-surface control-menu', look, className].filter(Boolean).join(' ')}>
          <ControlMenuPanel
            id={panelId}
            label={label ?? trigger.label}
            header={header}
            filter={filter}
            filterPlaceholder={filterPlaceholder}
            hints={hints}
            query={query}
            look={look}
            onQueryChange={setQuery}
          >
            {children}
          </ControlMenuPanel>
        </ListboxPanel>
      )}
    </>
  );
};

export { ControlMenu };
