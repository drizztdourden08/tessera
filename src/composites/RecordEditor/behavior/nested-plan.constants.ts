/* @layer renderer-components @kind data */
const MAX_NESTING = 12;

const NO_FIELDS = 'No fields described. Shown as recorded.';
const TOO_DEEP = 'Nested too deep to lay out. Shown as recorded.';
const NO_BRANCH: Record<string, string> = {
  absent: 'No value set. Shown as recorded.',
  'not-object': 'Not a branch shape. Shown as recorded.',
  unmatched: 'Unrecognised branch. Shown as recorded.',
};

export { MAX_NESTING, NO_BRANCH, NO_FIELDS, TOO_DEEP };
