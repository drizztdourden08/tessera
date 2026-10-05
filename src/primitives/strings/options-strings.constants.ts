/* @layer renderer-components @kind data */
const OPTION_STRINGS = {
  add: 'Add',
  addKey: (count: number) => `Add an item: type to search ${count} items`,
  addFree: 'Add a name',
  keyName: 'Name',
  valueOf: (key: string) => `Value of ${key}`,
  listedTwice: (key: string) => `${key} is listed twice.`,
  emptyKey: 'Every row needs a name.',
  unknownKey: (key: string) => `${key} is not on the list.`,
  noEntries: 'Nothing added yet.',
  changed: 'changed',
  advanced: 'advanced',
  groupChanged: (label: string, changed: number) => (changed ? `${label} · ${changed} changed` : label),
  showAdvanced: (count?: number) => (count === undefined ? 'Show advanced' : `Show advanced (${count})`),
  searchOptions: 'Search options',
};

export { OPTION_STRINGS };
