/* @layer tooling-scripts @kind logic */
const appWords = (sources) => ({
  tree: sources.length > 0 ? `the Tessera tree or ${sources.join(', ')}` : 'the Tessera tree',
  unknown: 'which is neither a Tessera export nor a part of this app',
});

export { appWords };
