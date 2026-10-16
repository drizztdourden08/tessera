/* @layer renderer-components @kind logic */
import { BAR_GROUP_ID } from '../WindowTitleBar.constants';
import { controlItem } from './control-item';
import { menuControls } from './menu-controls';
import type { PlacedNode } from './placed-node.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const tuckedNodes = (input: TitleBarMenuInput): PlacedNode[] => {
  const own = input.tuckedRows ?? {};
  const listed = menuControls(input, (control) => input.tucked?.includes(`control:${control}`) === true && own[control]?.hidden !== true);
  return listed.map((control) => {
    const row = own[control] ?? {};
    return { node: controlItem(input, control, `${BAR_GROUP_ID}-`, row), place: { group: row.group, position: row.position } };
  });
};

export { tuckedNodes };
