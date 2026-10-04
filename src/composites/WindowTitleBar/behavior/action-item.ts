/* @layer renderer-components @kind logic */
import { ACTION_ITEM_PREFIX } from '../WindowTitleBar.constants';

const actionItem = (id: string): string => `${ACTION_ITEM_PREFIX}${id}`;

export { actionItem };
