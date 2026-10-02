/* @layer tooling-scripts @kind logic */
import { REQUIRED_LISTS, REQUIRED_TEXT } from './ai.constants.mjs';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const isEntry = (value) => isText(value) || (isText(value?.case) && isText(value?.use));

const listProblem = (usage, field) => {
  const list = usage[field];
  if (!Array.isArray(list) || list.length === 0) return `${field} is missing or empty`;
  return list.every(isEntry) ? undefined : `${field} has an empty entry`;
};

const treeProblem = (usage) => {
  if (usage.buildingBlock === true) return usage.tree === undefined ? undefined : 'a building block has no tree';
  if (usage.tree === undefined) return 'tree is missing (set buildingBlock: true for a part the tree does not reach)';
  const { path, rule } = usage.tree;
  if (!Array.isArray(path) || path.length === 0) return 'tree.path is missing or empty';
  return isText(rule) ? undefined : 'tree.rule is missing or empty';
};

const missingFields = (usage) => [
  ...REQUIRED_TEXT.filter((field) => !isText(usage[field])).map((field) => `${field} is missing or empty`),
  ...(isText(usage.job) && usage.job.includes('\n') ? ['job runs over more than one line'] : []),
  ...REQUIRED_LISTS.map((field) => listProblem(usage, field)),
  treeProblem(usage),
].filter(Boolean);

export { missingFields };
