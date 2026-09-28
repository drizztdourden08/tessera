/* @layer renderer-components @kind logic */
const ancestorsOf = (path: string, into: Set<string>): void => {
  let probe = path;
  while (probe) {
    into.add(probe);
    const cut = Math.max(probe.lastIndexOf('.'), probe.lastIndexOf('['));
    probe = cut <= 0 ? '' : probe.slice(0, cut);
  }
};

const markedPaths = (paths: readonly string[]): ReadonlySet<string> => {
  const marked = new Set<string>();
  for (const path of paths) ancestorsOf(path, marked);
  return marked;
};

export { markedPaths };
