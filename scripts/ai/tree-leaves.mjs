/* @layer tooling-scripts @kind logic */
const leavesUnder = (node, path) =>
  Object.entries(node.answers).flatMap(([answer, next]) =>
    next === null ? [[...path, answer]] : leavesUnder(next, [...path, answer]));

const treeLeaves = (tree) => leavesUnder(tree, []);

export { treeLeaves };
