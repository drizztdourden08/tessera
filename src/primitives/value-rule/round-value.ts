/* @layer renderer-components @kind util */
const roundValue = (value: number): number => {
  const rounded = Number(value.toFixed(10));
  return rounded === 0 ? 0 : rounded;
};

export { roundValue };
