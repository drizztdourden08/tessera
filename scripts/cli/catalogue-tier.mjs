/* @layer tooling-scripts @kind logic */
const TIER = /\btier:\s*'([^']+)'/;
const GROUP = /\bgroup:\s*'((?:\\.|[^'\\])*)'/g;

const catalogueTier = (text) => ({
  tier: TIER.exec(text)?.[1],
  groups: [...text.matchAll(GROUP)].map((match) => ({ name: match[1].replace(/\\(.)/g, '$1'), index: match.index })),
});

export { catalogueTier };
