/* @layer renderer-components @kind logic */
const twoColumnsFit = (grid: HTMLElement): boolean => {
  const minCol = Number(grid.dataset.minCol);
  if (minCol > 0) {
    const style = getComputedStyle(grid);
    const room = grid.clientWidth - (Number.parseFloat(style.paddingInlineStart) || 0) - (Number.parseFloat(style.paddingInlineEnd) || 0);
    const gap = Number.parseFloat(style.columnGap) || 0;
    return room + 0.5 >= 2 * minCol + gap;
  }
  const columns = Number(grid.dataset.columns);
  return !(columns > 0) || columns >= 2;
};

export { twoColumnsFit };
