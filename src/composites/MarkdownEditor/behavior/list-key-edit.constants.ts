/* @layer renderer-components @kind data */
import { clearEmptyItem } from './clear-empty-item';
import { continueList } from './continue-list';
import type { ListEdit } from './list-line.type';
import { normalizeTask } from './normalize-task';

const LIST_KEY_EDITS: Partial<Record<string, ListEdit>> = { Enter: continueList, Backspace: clearEmptyItem, ' ': normalizeTask };

export { LIST_KEY_EDITS };
