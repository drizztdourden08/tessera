/* @layer renderer-components @kind data */
const INLINE_EDIT_STRINGS = {
  edit: (name: string) => `Edit ${name}`,
  editNamed: (label: string, value: string) => `Edit ${label}: ${value}`,
  fallbackName: 'text',
};

export { INLINE_EDIT_STRINGS };
