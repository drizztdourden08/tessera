/* @layer stories @kind data */
const EDITOR_STRINGS = {
  name: 'Name',
  clean: 'No changes',
  dirty: 'Unsaved changes',
  saving: 'Saving',
  saved: 'Saved',
  failed: 'Not saved',
  failedBecause: (reason: string) => `Not saved: ${reason}`,
};

export { EDITOR_STRINGS };
