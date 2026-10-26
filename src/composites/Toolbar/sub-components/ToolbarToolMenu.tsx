/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { DropdownMenu } from '../../DropdownMenu';
import { ToolbarContext } from '../behavior/toolbar-context';
import { toolMenuSide } from '../behavior/tool-menu-side';
import type { ToolbarToolMenuProps } from './ToolbarToolMenu.type';

const ToolbarToolMenu = (props: ToolbarToolMenuProps) => {
  const { groups, anchorRef, tool, label, hoverOpen, popup } = props;
  const { orientation, menuSide } = useContext(ToolbarContext);
  return (
    <DropdownMenu
      groups={groups}
      anchorRef={anchorRef}
      side={toolMenuSide(orientation, menuSide)}
      align={popup ? 'end' : 'start'}
      label={label}
      focusOnOpen={tool.mode === 'focus'}
      hover={hoverOpen ? tool.hover : undefined}
      onClose={tool.close}
    />
  );
};

export { ToolbarToolMenu };
