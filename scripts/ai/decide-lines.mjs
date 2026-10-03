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

const decideLines = (node, path, components, depth = 0) => {
  const pad = '  '.repeat(depth);
  return Object.entries(node.answers).flatMap(([answer, next]) => {
    const here = [...path, answer];
    if (next === null) return leafLines(answer, atLeaf(components, here), pad);
    return [`${pad}- ${sentence(answer)} **${next.question}**`, ...decideLines(next, here, components, depth + 1)];
  });
};

export { decideLines };
