/* @layer renderer-components @kind util */
const toNumber = (v: unknown): number | undefined => {
  const n = Number(v);
  return v === undefined || v === '' || Number.isNaN(n) ? undefined : n;
};

export { toNumber };
