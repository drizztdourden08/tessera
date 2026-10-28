/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarToolProps } from '../sub-components/ToolbarTool.type';

interface ToolSetup {
  props: ToolbarToolProps;
  panel: boolean;
  options: readonly MenuGroup[];
  inline: boolean;
  menu: boolean;
}

export type { ToolSetup };
