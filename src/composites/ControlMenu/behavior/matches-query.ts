/* @layer renderer-components @kind logic */
const matchesQuery = (label: string, query: string): boolean => {
  const needle = query.trim().toLocaleLowerCase();
  return needle === '' || label.toLocaleLowerCase().includes(needle);
};

export { matchesQuery };
