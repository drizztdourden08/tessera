/* @layer tooling-scripts @kind logic */
import { buildingBlocks } from './building-blocks.mjs';
import { decideLines } from './decide-lines.mjs';

const renderDecide = (model) => [
  '# Decide which component to use\n',
  'Start at the first question and pick the answer that fits. Each answer leads to the next question or to the components for that case. The component page then gives its rules and an example.\n',
  `**${model.tree.question}**\n`,
  `${decideLines(model.tree, [], model.components).join('\n')}\n`,
  ...buildingBlocks(model.components),
].join('\n');

export { renderDecide };
