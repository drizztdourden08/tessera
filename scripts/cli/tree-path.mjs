/* @layer tooling-scripts @kind logic */
import { TREE_SEPARATOR } from './new.constants.mjs';

const listed = (node) => Object.keys(node.answers).map((answer) => `"${answer}"`).join(', ');

const step = (node, answer, walked) => {
  if (!node?.answers) return { problem: `${walked.join(TREE_SEPARATOR)} is already an answer with no further question; drop "${answer}"` };
  if (!Object.hasOwn(node.answers, answer)) return { problem: `"${answer}" does not answer "${node.question}". Its answers: ${listed(node)}` };
  return { node: node.answers[answer] };
};

const treePath = (tree, text) => {
  const path = text.split(TREE_SEPARATOR.trim()).map((part) => part.trim()).filter(Boolean);
  let node = tree;
  for (const [depth, answer] of path.entries()) {
    const next = step(node, answer, path.slice(0, depth));
    if (next.problem) return { problem: `--tree: ${next.problem}` };
    node = next.node;
  }
  if (node?.answers) return { problem: `--tree stops at the question "${node.question}". Add one of its answers: ${listed(node)}` };
  return { path };
};

export { treePath };
