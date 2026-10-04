/* @layer renderer-components @kind logic */
import { FULLSCREEN_ITEM, PIN_ITEM } from '../WindowTitleBar.constants';
import type { WindowControlsConfig, WindowTitleBarAction, WindowTitleBarActionBar } from '../WindowTitleBar.type';
import { actionBar } from './action-bar';
import { actionItem } from './action-item';

const shownAs = (actions: readonly WindowTitleBarAction[], bars: readonly WindowTitleBarActionBar[]): string[] =>
  actions.filter((action) => bars.includes(actionBar(action) ?? 'menu')).map((action) => actionItem(action.id)).reverse();

const hideOrder = (actions: readonly WindowTitleBarAction[], controls: WindowControlsConfig): string[] => [
  ...shownAs(actions, ['button', 'dropdown']),
  ...(controls.pin === false ? [] : [PIN_ITEM]),
  ...shownAs(actions, ['status']),
  ...(controls.fullscreen === false ? [] : [FULLSCREEN_ITEM]),
];

export { hideOrder };
