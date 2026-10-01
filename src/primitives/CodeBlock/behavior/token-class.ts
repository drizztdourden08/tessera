/* @layer renderer-components @kind util */
const tokenClass = (types: readonly string[]): string =>
  ['code-block__token', ...types.map((type) => `code-block__token--${type}`)].join(' ');

export { tokenClass };
