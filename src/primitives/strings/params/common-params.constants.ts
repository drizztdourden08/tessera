/* @layer renderer-components @kind data */
const COMMON_PARAMS = {
  resetNamed: ['name'],
  renameNamed: ['name'],
  copyNamed: ['name'],
  selectedCount: ['count'],
  removeNamed: ['name'],
  nextTryIn: ['wait'],
  tryOfIn: ['attempt', 'attempts', 'wait'],
  tryOf: ['attempt', 'attempts'],
  waitSeconds: ['seconds'],
  waitMinutes: ['minutes', 'seconds'],
  repeated: ['count'],
  repeatedShort: ['count'],
} as const;

export { COMMON_PARAMS };
