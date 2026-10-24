/* @layer renderer-components @kind util */
import { shortcutRows } from '../../../primitives/Shortcut';
import { ariaKeyShortcuts } from '../../DropdownMenu/behavior/aria-key-shortcuts';
import { STOP_ATTRIBUTE } from '../Toolbar.constants';
import type { ToolbarToolButtonProps } from '../sub-components/ToolbarToolButton.type';
import type { ToolbarContextValue } from './toolbar-context.type';

const menuAttributes = (menu: boolean, open: boolean, popup: boolean) => ({
  'data-menu': (menu && !popup) || undefined,
  'aria-haspopup': menu ? ('menu' as const) : undefined,
  'aria-expanded': menu ? open : undefined,
});

const toolAttributes = (props: ToolbarToolButtonProps, context: ToolbarContextValue) => {
  const { stopId, shortcut, menu, open, popup } = props;
  const quiet = context.measure;
  return {
    tabIndex: quiet || context.stop !== stopId ? -1 : 0,
    [STOP_ATTRIBUTE]: quiet ? undefined : stopId,
    'aria-keyshortcuts': shortcut === undefined ? undefined : shortcutRows(shortcut).map((row) => ariaKeyShortcuts(row.keys)).join(' ') || undefined,
    ...menuAttributes(menu, open, popup),
  };
};

export { toolAttributes };
