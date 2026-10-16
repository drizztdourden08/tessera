/* @layer renderer-components @kind logic */
import { ACTION_ITEM_PREFIX } from '../WindowTitleBar.constants';
import type { WindowTitleBarItemId } from '../WindowTitleBar.type';

const actionItem = (id: string): WindowTitleBarItemId => `${ACTION_ITEM_PREFIX}${id}`;

export { actionItem };
