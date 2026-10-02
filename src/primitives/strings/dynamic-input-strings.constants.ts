/* @layer renderer-components @kind data */
const DYNAMIC_INPUT_STRINGS = {
  hour: 'Hour',
  minute: 'Minute',
  counter: (count: number, max: number) => `${count} / ${max}`,
  counterLabel: (count: number, max: number) => `${count} of ${max} characters`,
};

export { DYNAMIC_INPUT_STRINGS };
