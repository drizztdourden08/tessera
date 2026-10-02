/* @layer renderer-components @kind util */
const percentOfRange = (min: number, max: number) => (value: number): string => {
  const span = max - min;
  return `${Math.round(span > 0 ? ((value - min) / span) * 100 : 0)}%`;
};

export { percentOfRange };
