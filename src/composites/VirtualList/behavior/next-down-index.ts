/* @layer renderer-components @kind logic */
const nextIndex = (key: string, active: number, count: number, page: number): number | undefined => {
  if (count <= 0) return undefined;
  const last = count - 1;
  switch (key) {
    case 'ArrowDown': return Math.min(active + 1, last);
    case 'ArrowUp': return Math.max(active - 1, 0);
    case 'PageDown': return Math.min(active + page, last);
    case 'PageUp': return Math.max(active - page, 0);
    case 'Home': return 0;
    case 'End': return last;
    default: return undefined;
  }
};

export { nextIndex };
