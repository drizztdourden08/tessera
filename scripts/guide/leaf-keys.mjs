/* @layer tooling-scripts @kind logic */
const leafKeys = (leaves) => new Set(leaves.map((leaf) => JSON.stringify(leaf)));

export { leafKeys };
