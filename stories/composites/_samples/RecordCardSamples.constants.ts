/* @layer stories @kind data */
const RECORD_ROWS = [
  { code: 'ARG-12', title: 'Fix the login redirect', note: 'The redirect drops the return path after sign in.' },
  { code: 'ARG-13', title: 'Show the run time in the list header', note: 'Use the same format as the detail view.' },
  { code: 'ARG-14', title: 'Rename the export dialog', note: 'The name should say what is exported.' },
] as const;

export { RECORD_ROWS };
