/* @layer renderer-components @kind data */
const DYNAMIC_INPUT_PARAMS = {
  incomplete: ['count'],
  incompleteMin: ['count'],
  counter: ['count', 'max'],
  counterLabel: ['count', 'max'],
} as const;

export { DYNAMIC_INPUT_PARAMS };
