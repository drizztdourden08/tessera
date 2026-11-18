/* @layer renderer-components @kind data */
const ITEMS_PARAMS = {
  asksFirst: ['label'],
  confirmQuestion: ['label'],
  confirmAgain: ['label'],
  fixBeforeSaving: ['count'],
  andMore: ['count'],
  checkCount: ['count', 'word'],
  revealFile: ['name'],
} as const;

export { ITEMS_PARAMS };
