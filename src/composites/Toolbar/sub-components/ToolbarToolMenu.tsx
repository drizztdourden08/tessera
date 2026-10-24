/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { DropdownMenu } from '../../DropdownMenu';
import { ToolbarContext } from '../behavior/toolbar-context';
import { MENU_SIDE } from '../Toolbar.constants';
import type { ToolbarToolMenuProps } from './ToolbarToolMenu.type';

const ToolbarToolMenu = (props: ToolbarToolMenuProps) => {
  const { groups, anchorRef, tool, label, hoverOpen, popup } = props;
  const { orientation } = useContext(ToolbarContext);
  return (
    <DropdownMenu
      groups={groups}
      anchorRef={anchorRef}
      side={MENU_SIDE[orientation]}
      align={popup ? 'end' : 'start'}
      label={label}
      focusOnOpen={tool.mode === 'focus'}
      hover={hoverOpen ? tool.hover : undefined}
      onClose={tool.close}
    />
  );
};

export { ToolbarToolMenu };
