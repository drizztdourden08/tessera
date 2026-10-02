/* @layer tooling-scripts @kind logic */
import { capital } from './capital.mjs';
import { pageLink } from './page-link.mjs';
import { sentence } from './sentence.mjs';

const BASE = 'components/';

const atLeaf = (components, path) => {
  const key = JSON.stringify(path);
  return components.filter((c) => c.page && c.usage.tree && JSON.stringify(c.usage.tree.path) === key);
};

const leafLines = (answer, found, pad) => {
  if (found.length === 0) return [`${pad}- ${capital(answer)}: no component yet.`];
  if (found.length === 1) return [`${pad}- ${capital(answer)}: ${pageLink(found[0], BASE)}. ${sentence(found[0].usage.tree.rule)}`];
  return [`${pad}- ${capital(answer)}:`, ...found.map((c) => `${pad}  - ${pageLink(c, BASE)}. ${sentence(c.usage.tree.rule)}`)];
};

const nodeLines = (node, path, components, depth) => {
  const pad = '  '.repeat(depth);
  return Object.entries(node.answers).flatMap(([answer, next]) => {
    const here = [...path, answer];
    if (next === null) return leafLines(answer, atLeaf(components, here), pad);
    return [`${pad}- ${sentence(answer)} **${next.question}**`, ...nodeLines(next, here, components, depth + 1)];
  });
};

const blocksSection = (components) => {
  const blocks = components.filter((c) => c.page && c.usage.buildingBlock === true);
  if (blocks.length === 0) return [];
  return ['## Building blocks\n', 'No question leads to these parts. Other components are built on them; reach for one only when no component above fits.\n', `${blocks.map((c) => `- ${pageLink(c, BASE)}. ${sentence(c.usage.job)}`).join('\n')}\n`];
};

const renderDecide = (model) => [
  '# Decide which component to use\n',
  'Start at the first question and pick the answer that fits. Each answer leads to the next question or to the components for that case. The component page then gives its rules and an example.\n',
  `**${model.tree.question}**\n`,
  `${nodeLines(model.tree, [], model.components, 0).join('\n')}\n`,
  ...blocksSection(model.components),
].join('\n');

export { renderDecide };
