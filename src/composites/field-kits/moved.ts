/* @layer renderer-components @kind logic */
const moved = (list: readonly unknown[], from: number, to: number): readonly unknown[] => {
  const next = [...list];
  const [lifted] = next.splice(from, 1);
  next.splice(to, 0, lifted);
  return next;
};

export { moved };
