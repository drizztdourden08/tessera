/* @layer renderer-components @kind util */
const stepGap = (order: readonly string[], keys: readonly string[], by: number): number | undefined => {
  const moving = new Set(keys);
  const places = order.flatMap((key, at) => (moving.has(key) ? [at] : []));
  const first = places[0];
  const last = places[places.length - 1];
  if (first === undefined || last === undefined || by === 0) return undefined;
  if (by < 0) return first === 0 ? undefined : Math.max(0, first + by);
  return last === order.length - 1 ? undefined : Math.min(order.length, last + 1 + by);
};

export { stepGap };
