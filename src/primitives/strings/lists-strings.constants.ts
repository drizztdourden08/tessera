/* @layer renderer-components @kind data */
const LIST_STRINGS = {
  newItem: 'New',
  count: (title: string, shown: number, total: number) => (shown === total ? `${title} · ${total}` : `${title} · ${shown} of ${total}`),
  filterOf: (title: string) => `Filter ${title.toLowerCase()}`,
  loadingOf: (title: string) => `Loading ${title.toLowerCase()}`,
  empty: 'Nothing here yet.',
  noMatch: (query: string) => `Nothing matches "${query}".`,
  newName: 'New name',
  keepName: 'Keep the name',
  cancelRename: 'Cancel the rename',
  deleteNamed: (name: string) => `Delete ${name}`,
  deleteCancel: 'Keep',
  unsavedOpen: (current: string, next: string) => `${current} has unsaved changes. Save them before you open ${next}?`,
  unsavedLeave: (current: string) => `${current} has unsaved changes. Save them before you leave it?`,
  saveAndOpen: 'Save and open',
  saveAndLeave: 'Save and leave',
  pickItem: 'Pick an item from the list.',
};

export { LIST_STRINGS };
