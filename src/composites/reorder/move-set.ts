/* @layer renderer-components @kind util */
const moveSet = (order: readonly string[], keys: readonly string[], before: number): string[] => {
  const moving = new Set(keys);
  const head = order.slice(0, before).filter((key) => !moving.has(key));
  const tail = order.slice(before).filter((key) => !moving.has(key));
  return [...head, ...order.filter((key) => moving.has(key)), ...tail];
};

export { moveSet };
