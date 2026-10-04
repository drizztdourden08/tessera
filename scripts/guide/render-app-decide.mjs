/* @layer tooling-scripts @kind logic */
import { buildingBlocks } from './building-blocks.mjs';
import { decideLines } from './decide-lines.mjs';

const treeSection = (model) => {
  if (Object.keys(model.tree.answers).length === 0) return ['No app part sits in the decision tree yet.\n'];
  return [`**${model.tree.question}**\n`, `${decideLines(model.tree, [], model.components).join('\n')}\n`];
};

const renderAppDecide = (model) => [
  '# Decide which app part to use\n',
  `Start with [the Tessera decision tree](${model.app.tesseraGuide}/decide.md). This app adds the answers below to its questions and places its own parts at some of its answers. Each answer leads to the next question or to the parts for that case. The part page then gives its rules and an example.\n`,
  ...treeSection(model),
  ...buildingBlocks(model.components),
].join('\n');

export { renderAppDecide };
