/* @layer renderer-components @kind data */
const WIZARD_STRINGS = {
  back: 'Back',
  next: 'Next',
  finish: 'Finish',
  finishing: 'Finishing...',
  edit: 'Edit',
  editStep: (label: string) => `Edit ${label}`,
  finishFailed: 'That did not work. Nothing was saved, and everything you entered is still here.',
  discardTitle: 'Discard your changes?',
  discardMessage: 'What you entered here is not saved yet. Leaving now throws it away.',
  discard: 'Discard',
  keepEditing: 'Keep editing',
  busyTitle: 'Still working',
  busyMessage: 'This is still running. Wait for it to finish before you leave.',
  busyConfirm: 'Wait',
};

export { WIZARD_STRINGS };
