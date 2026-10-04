/* @layer tooling-scripts @kind logic */
import { nodeProblem } from './node-problem.mjs';
import { treeLeaves } from './tree-leaves.mjs';

const questionAt = (tree, at) => {
  let node = tree;
  for (const answer of at) node = node?.answers?.[answer];
  return node?.answers ? node : undefined;
};

const branchProblem = (tree, branch) => {
  const { at, answers } = branch ?? {};
  if (!Array.isArray(at) || answers === null || typeof answers !== 'object') return 'a branch is not { at, answers }';
  const question = questionAt(tree, at);
  if (!question) return `at [${at.join(' > ')}] does not lead to a question`;
  const taken = Object.keys(answers).find((answer) => Object.hasOwn(question.answers, answer));
  if (taken) return `"${taken}" already answers "${question.question}"`;
  return nodeProblem({ question: question.question, answers }, at.join(' > ') || 'the first question');
};

const graftBranch = (tree, branch) => {
  const problem = branchProblem(tree, branch);
  if (problem) return { problem };
  Object.assign(questionAt(tree, branch.at).answers, JSON.parse(JSON.stringify(branch.answers)));
  return { leaves: treeLeaves({ answers: branch.answers }).map((leaf) => [...branch.at, ...leaf]) };
};

export { graftBranch };
