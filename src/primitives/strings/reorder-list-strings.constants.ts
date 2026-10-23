/* @layer renderer-components @kind data */
const REORDER_LIST_STRINGS = {
  moved: (name: string, position: number, total: number) => `${name} moved to position ${position} of ${total}`,
  moveHint: 'Alt and Up or Down moves the row',
  empty: 'Nothing here yet.',
};

export { REORDER_LIST_STRINGS };
