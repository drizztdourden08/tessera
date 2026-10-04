/* @layer tooling-scripts @kind logic */
import { appScopes } from '../guide/app-scopes.mjs';
import { askTree } from './ask-tree.mjs';
import { readTree } from './read-tree.mjs';
import { treePath } from './tree-path.mjs';

const treeOf = async (project) => {
  if (project.mode !== 'app' || !project.config.guide.tree) return { root: readTree() };
  const { appTree } = await import('../guide/app-tree.mjs');
  const { tree, problems } = appTree(project.root, appScopes(project.config));
  return problems.length > 0 ? { problem: problems.map((f) => `${f.at}: ${f.message}`).join('; ') } : { root: tree };
};

const pickTree = async (io, { tree, name, project }) => {
  if (tree === undefined && !io.interactive) return { path: undefined };
  const { root, problem } = await treeOf(project);
  if (problem) return { problem };
  if (tree !== undefined) return treePath(root, tree);
  io.log(`Place ${name} in the decision tree of guide/decide.md, or press Enter to make it a building block.`);
  return { path: await askTree(io, root) };
};

export { pickTree };
