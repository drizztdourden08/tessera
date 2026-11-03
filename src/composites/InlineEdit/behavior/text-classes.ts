/* @layer renderer-components @kind util */
const textClasses = (empty: boolean, drawn: boolean): string => [
  'inline-edit__text',
  drawn && 'inline-edit__text--drawn',
  empty && 'inline-edit__text--empty',
].filter(Boolean).join(' ');

export { textClasses };
