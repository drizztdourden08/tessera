/* @layer renderer-components @kind data */
const PANELS_PARAMS = {
  logNoun: ['total'],
  logCount: ['shown', 'total', 'noun'],
  loadOlder: ['count'],
  olderHidden: ['count'],
  resetSection: ['changed'],
  showLog: ['count'],
} as const;

export { PANELS_PARAMS };
