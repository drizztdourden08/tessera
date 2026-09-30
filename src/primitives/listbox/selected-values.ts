/* @layer renderer-components @kind util */
const selectedValues = <V>(multi: boolean, value: V | null | undefined, values: readonly V[] | undefined): readonly V[] => {
  if (multi) return values ?? [];
  return value === null || value === undefined ? [] : [value];
};

export { selectedValues };
