/* @layer renderer-components @kind util */
const optionMixed = <T extends string>(mixed: boolean | readonly T[] | undefined, option: T, value: T): boolean =>
  typeof mixed === 'object' && mixed.includes(option) && option !== value;

export { optionMixed };
