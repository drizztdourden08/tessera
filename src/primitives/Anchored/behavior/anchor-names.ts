/* @layer renderer-components @kind util */
const anchorNames = (current: string, add: string | null, drop: string | null): string => {
  const names = current.split(',').map((name) => name.trim()).filter((name) => name !== '' && name !== drop && name !== add);
  return (add === null ? names : [...names, add]).join(', ');
};

export { anchorNames };
