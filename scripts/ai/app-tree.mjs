/* @layer tooling-scripts @kind logic */
import { relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { APP_TREE_EXPORT, TREE_MODULE } from './ai.constants.mjs';
import { graftBranch } from './graft-branch.mjs';
import { loadModule } from './load-module.mjs';
import { TESSERA_ROOT } from './tessera-root.constants.mjs';

const treeFinding = (at, message) => ({ kind: 'app-tree', name: at, at, message, coverage: false });

const readBranches = (root, file) => {
  try {
    const branches = loadModule(root, file)[APP_TREE_EXPORT];
    return Array.isArray(branches) ? { branches } : { problem: `exports no ${APP_TREE_EXPORT} list` };
  } catch (error) {
    return { problem: error instanceof Error ? error.message : String(error) };
  }
};

const graftModule = (root, file, merged) => {
  const { branches, problem } = readBranches(root, file);
  if (problem) return [treeFinding(file, problem)];
  return branches.flatMap((branch) => {
    const result = graftBranch(merged.tree, branch);
    if (result.problem) return [treeFinding(file, result.problem)];
    merged.leaves.push(...result.leaves);
    merged.leafSources.push(...result.leaves.map(() => file));
    return [];
  });
};

const appTree = (root, scopes) => {
  const sources = [...new Set(scopes.map((scope) => scope.ai.tree).filter(Boolean))].map((file) => posixPath(relative(root, file)));
  const merged = { tree: JSON.parse(JSON.stringify(loadModule(TESSERA_ROOT, TREE_MODULE.slice(1)).DECISION_TREE)), leaves: [], leafSources: [] };
  const problems = sources.flatMap((file) => graftModule(root, file, merged));
  return { tree: merged.tree, appLeaves: merged.leaves, leafSources: merged.leafSources, sources, problems };
};

export { appTree };
