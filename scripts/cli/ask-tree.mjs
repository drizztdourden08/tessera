/* @layer tooling-scripts @kind logic */
import { askChoice } from './ask-choice.mjs';

const askTree = async (io, node, path = []) => {
  if (!node.answers) return path;
  const answer = await askChoice(io, { question: node.question, options: Object.keys(node.answers), emptyMeans: 'a building block' });
  return answer === undefined ? undefined : askTree(io, node.answers[answer], [...path, answer]);
};

export { askTree };
