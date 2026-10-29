/* @layer stories @kind util */
const brushPatternUri = (rows: readonly string[]): string => {
  const width = rows[0]?.length ?? 0;
  const cells = rows.flatMap((row, y) => [...row].flatMap((char, x) => (char === '#' ? [`M${x} ${y}h1v1h-1z`] : [])));
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${rows.length}' width='${width}' height='${rows.length}'><path d='${cells.join('')}' fill='#303040'/></svg>`,
  )}`;
};

export { brushPatternUri };
