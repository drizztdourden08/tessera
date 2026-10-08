/* @layer tooling-scripts @kind logic */
const listed = (folders) => `${folders.slice(0, -1).join(', ')} and ${folders.at(-1)}`;

const duplicateParts = (components) => {
  const byName = new Map();
  for (const c of components) byName.set(c.name, [...(byName.get(c.name) ?? []), c.folder]);
  return [...byName].filter(([, folders]) => folders.length > 1).map(([name, folders]) => ({
    kind: 'duplicate-part', name, message: `${name} names a part in ${listed(folders)}; give each its own name`, coverage: false,
  }));
};

export { duplicateParts };
