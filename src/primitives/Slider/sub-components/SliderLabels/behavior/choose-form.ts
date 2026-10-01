/* @layer renderer-components @kind util */
const chooseForm = (forms: readonly string[], value: number): string => {
  if (forms.length === 3 && value === 0) return forms[0] ?? '';
  if (value === 1) return forms[forms.length - 2] ?? '';
  return forms[forms.length - 1] ?? '';
};

export { chooseForm };
