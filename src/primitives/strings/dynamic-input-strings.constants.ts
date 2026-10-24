/* @layer renderer-components @kind data */
const DYNAMIC_INPUT_STRINGS = {
  hour: 'Hour',
  minute: 'Minute',
  incomplete: (count: number) => `Enter all ${count} characters.`,
  incompleteMin: (count: number) => `Enter at least ${count} characters.`,
  counter: (count: number, max: number) => `${count} / ${max}`,
  counterLabel: (count: number, max: number) => `${count} of ${max} characters`,
};

export { DYNAMIC_INPUT_STRINGS };
