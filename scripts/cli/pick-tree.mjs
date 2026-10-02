/* @layer tooling-scripts @kind logic */
import { askTree } from './ask-tree.mjs';
import { readTree } from './read-tree.mjs';
import { treePath } from './tree-path.mjs';

const pickTree = async (io, { tree, name }) => {
  const root = readTree();
  if (tree !== undefined) return treePath(root, tree);
  if (!io.interactive) return { path: undefined };
  io.log(`Place ${name} in the decision tree of ai/decide.md, or press Enter to make it a building block.`);
  return { path: await askTree(io, root) };
};

export { pickTree };
