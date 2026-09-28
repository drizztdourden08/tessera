/* @layer renderer-components @kind logic */
const countLabel = (count: number): string => {
  if (count === 0) return 'none';
  return count === 1 ? '1 item' : `${count} items`;
};

export { countLabel };
