/* @layer renderer-components @kind util */
const tagFit = (widths: readonly number[], plusWidth: number, gap: number, available: number): number => {
  const total = widths.reduce((sum, width) => sum + width, 0) + gap * Math.max(widths.length - 1, 0);
  if (total <= available) return widths.length;
  let used = plusWidth;
  let count = 0;
  for (const width of widths) {
    used += gap + width;
    if (used > available) break;
    count += 1;
  }
  return count;
};

export { tagFit };
