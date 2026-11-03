/* @layer renderer-components @kind data */
const COMMAND_INPUT_STRINGS = {
  pick: 'Pick a command',
  search: 'Search commands',
  clear: 'Back to free text',
  optional: 'optional',
  sendNamed: (label: string) => `Send "${label}"`,
  fieldsLabel: (label: string) => `${label} parameters`,
  optionalLabel: (label: string, optional: string) => `${label} (${optional})`,
};

export { COMMAND_INPUT_STRINGS };
