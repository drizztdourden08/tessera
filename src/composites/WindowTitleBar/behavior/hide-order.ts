/* @layer renderer-components @kind logic */
import { FULLSCREEN_ITEM, PIN_ITEM } from '../WindowTitleBar.constants';
import type { WindowControlsConfig, WindowTitleBarAction } from '../WindowTitleBar.type';
import { actionBar } from './action-bar';
import { actionItem } from './action-item';

const shownAs = (actions: readonly WindowTitleBarAction[], bar: 'button' | 'status'): string[] =>
  actions.filter((action) => actionBar(action) === bar).map((action) => actionItem(action.id)).reverse();

const hideOrder = (actions: readonly WindowTitleBarAction[], controls: WindowControlsConfig): string[] => [
  ...shownAs(actions, 'button'),
  ...(controls.pin === false ? [] : [PIN_ITEM]),
  ...shownAs(actions, 'status'),
  ...(controls.fullscreen === false ? [] : [FULLSCREEN_ITEM]),
];

export { hideOrder };
