/* @layer tooling-scripts @kind logic */
const gap = (kind, name, message, tier) => ({ kind, name, message, tier, coverage: true });

const checkCoverage = (components, leaves) => {
  const reached = new Set(components.flatMap((c) => (c.usage?.tree ? [JSON.stringify(c.usage.tree.path)] : [])));
  return [
    ...components.filter((c) => !c.usage).map((c) => gap('missing-usage', c.name, `no ${c.usageFile}`, c.tier)),
    ...leaves.filter((leaf) => !reached.has(JSON.stringify(leaf))).map((leaf) => gap('unreached-leaf', undefined, leaf.join(' > '))),
  ];
};

export { checkCoverage };
