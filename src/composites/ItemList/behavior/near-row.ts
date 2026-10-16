/* @layer renderer-components @kind logic */
const nearRow = (order: readonly string[], live: readonly string[], id: string): string | undefined => {
  const at = order.indexOf(id);
  const after = order.slice(at + 1).find((other) => live.includes(other));
  return after ?? order.slice(0, Math.max(at, 0)).reverse().find((other) => live.includes(other));
};

export { nearRow };
