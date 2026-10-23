/* @layer stories @kind logic */
const moveInList = <Item,>(list: readonly Item[], from: number, to: number): Item[] => {
  const next = [...list];
  const [item] = next.splice(from, 1);
  if (item) next.splice(to, 0, item);
  return next;
};

export { moveInList };
