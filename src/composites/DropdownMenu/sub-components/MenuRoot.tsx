/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { MenuContext } from '../behavior/menu-context';
import { MenuGroups } from './MenuGroups';
import { MenuPanel } from './MenuPanel';
import type { MenuRootProps } from './MenuRoot.type';

const MenuRoot = (props: MenuRootProps) => {
  const { id, groups, label, start, closeOnSelect, onClose } = props;
  const context = useMemo(() => ({ close: onClose, closeOnSelect }), [onClose, closeOnSelect]);
  return (
    <MenuContext value={context}>
      <MenuPanel id={id} label={label} start={start} onExit={onClose}>
        <MenuGroups groups={groups} />
      </MenuPanel>
    </MenuContext>
  );
};

export { MenuRoot };
