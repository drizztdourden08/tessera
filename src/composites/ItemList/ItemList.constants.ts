/* @layer renderer-components @kind data */
const FILTER_FROM = 8;

const ROW_SELECTOR = '.list-item-row__main';

const ROW_KEYS: Readonly<Record<string, 'rename' | 'remove'>> = { F2: 'rename', Delete: 'remove' };

const ROW_ID = 'data-item-id';

const UNDO_SELECTOR = '.item-list__undo button';

const DELETE_SELECTOR = '.item-list__tools > .confirm-icon-btn:last-child button';

const NO_DELETES = { pending: [], done: [] } as const;

const TEXT_ENTRY = 'input, textarea, [contenteditable="true"]';

const MOVE_KEYS: Readonly<Record<string, (index: number, last: number) => number>> = {
  ArrowDown: (index, last) => Math.min(index + 1, last),
  ArrowUp: (index) => Math.max(index - 1, 0),
  Home: () => 0,
  End: (_index, last) => last,
};

export { DELETE_SELECTOR, FILTER_FROM, MOVE_KEYS, NO_DELETES, ROW_ID, ROW_KEYS, ROW_SELECTOR, TEXT_ENTRY, UNDO_SELECTOR };
