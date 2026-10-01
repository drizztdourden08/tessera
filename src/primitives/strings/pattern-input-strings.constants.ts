/* @layer renderer-components @kind data */
const PATTERN_INPUT_STRINGS = {
  hour: 'Hour',
  minute: 'Minute',
  counter: (count: number, max: number) => `${count} / ${max}`,
  counterLabel: (count: number, max: number) => `${count} of ${max} characters`,
};

export { PATTERN_INPUT_STRINGS };
