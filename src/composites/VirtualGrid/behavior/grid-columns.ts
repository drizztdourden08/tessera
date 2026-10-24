/* @layer renderer-components @kind logic */
const gridColumns = (width: number, tile: number): number => {
  if (tile <= 0 || width <= 0) return 1;
  return Math.max(1, Math.floor(width / tile));
};

export { gridColumns };
