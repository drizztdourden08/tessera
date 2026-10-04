/* @layer renderer-components @kind data */
const LIST_STRINGS = {
  newItem: 'New',
  count: (title: string, shown: number, total: number) => (shown === total ? `${title} · ${total}` : `${title} · ${shown} of ${total}`),
  filterOf: (title: string) => `Filter ${title.toLowerCase()}`,
  loadingOf: (title: string) => `Loading ${title.toLowerCase()}`,
  empty: 'Nothing here yet.',
  noMatch: (query: string) => `Nothing matches "${query}".`,
  rename: (name: string) => `Rename ${name}`,
  newName: 'New name',
  keepName: 'Keep the name',
  cancelRename: 'Cancel the rename',
  deleteNamed: (name: string) => `Delete ${name}`,
  deleteConfirm: 'Delete',
  deleteCancel: 'Keep',
  unsavedTitle: 'Unsaved changes',
  unsavedOpen: (current: string, next: string) => `${current} has unsaved changes. Save them before you open ${next}?`,
  unsavedLeave: (current: string) => `${current} has unsaved changes. Save them before you leave it?`,
  stayHere: 'Stay here',
  discard: 'Discard',
  saveAndOpen: 'Save and open',
  saveAndLeave: 'Save and leave',
  pickItem: 'Pick an item from the list.',
};

export { LIST_STRINGS };
