/* @layer renderer-components @kind logic */
const gridFixedColumns = (columns: number | undefined): number | undefined => {
  if (columns === undefined || !Number.isFinite(columns)) return undefined;
  const whole = Math.floor(columns);
  return whole >= 1 ? whole : undefined;
};

export { gridFixedColumns };
