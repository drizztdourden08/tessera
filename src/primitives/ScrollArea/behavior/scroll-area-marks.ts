/* @layer renderer-components @kind logic */
const scrollAreaMarks = (slim: boolean, autoHide: boolean) => ({
  'data-scrollbar': slim ? 'slim' : undefined,
  'data-thumb': autoHide ? 'auto' : undefined,
});

export { scrollAreaMarks };
