/* @layer stories @kind logic */

const trackWidth = (grid: HTMLElement): number => {
  const style = getComputedStyle(grid);
  const tracks = style.gridTemplateColumns.split(' ').map((size) => Number.parseFloat(size)).filter((size) => Number.isFinite(size));
  const gap = Number.parseFloat(style.columnGap) || 0;
  return tracks.reduce((sum, size) => sum + size, 0) + gap * Math.max(0, tracks.length - 1);
};

export { trackWidth };
