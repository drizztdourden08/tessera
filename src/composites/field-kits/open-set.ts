/* @layer renderer-components @kind logic */
const withCurrentValue = (
  options: readonly string[],
  current: string,
): readonly string[] =>
  current === '' || options.includes(current) ? options : [...options, current];

export { withCurrentValue };
