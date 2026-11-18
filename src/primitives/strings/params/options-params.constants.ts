/* @layer renderer-components @kind data */
const OPTIONS_PARAMS = {
  addKey: ['count'],
  valueOf: ['key'],
  listedTwice: ['key'],
  unknownKey: ['key'],
  groupChanged: ['label', 'changed'],
  showAdvanced: ['count'],
} as const;

export { OPTIONS_PARAMS };
