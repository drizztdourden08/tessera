/* @layer renderer-components @kind util */
import { shortcutRows } from '../../../primitives/Shortcut';
import { ariaKeyShortcuts } from '../../DropdownMenu/behavior/aria-key-shortcuts';
import { STOP_ATTRIBUTE } from '../Toolbar.constants';
import type { ToolbarToolButtonProps } from '../sub-components/ToolbarToolButton.type';
import type { ToolbarContextValue } from './toolbar-context.type';

const popupKind = (panel: boolean): 'dialog' | 'menu' => (panel ? 'dialog' : 'menu');

const menuAttributes = (props: ToolbarToolButtonProps) => {
  const { menu, open, popup, panel } = props;
  return {
    'data-menu': (menu && !popup) || undefined,
    'aria-haspopup': menu ? popupKind(panel) : undefined,
    'aria-expanded': menu ? open : undefined,
  };
};

const toolAttributes = (props: ToolbarToolButtonProps, context: ToolbarContextValue) => {
  const { stopId, shortcut, borrowed } = props;
  const quiet = context.measure;
  return {
    tabIndex: quiet || context.stop !== stopId ? -1 : 0,
    [STOP_ATTRIBUTE]: quiet ? undefined : stopId,
    'data-borrowed': borrowed === true ? true : undefined,
    'aria-keyshortcuts': shortcut === undefined ? undefined : shortcutRows(shortcut).map((row) => ariaKeyShortcuts(row.keys)).join(' ') || undefined,
    ...menuAttributes(props),
  };
};

export { toolAttributes };
