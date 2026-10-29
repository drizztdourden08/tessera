/* @layer renderer-components @kind logic */
const lastRowPosition = (length: number, columns: number, column: number): number => {
  const candidate = Math.floor((length - 1) / columns) * columns + column;
  return candidate >= length ? Math.max(0, candidate - columns) : candidate;
};

export { lastRowPosition };
