/* @layer tooling-scripts @kind logic */
const treeWithComponents = (node, path, components) => ({
  question: node.question,
  answers: Object.fromEntries(Object.entries(node.answers).map(([answer, next]) => {
    const here = [...path, answer];
    if (next !== null) return [answer, treeWithComponents(next, here, components)];
    const key = JSON.stringify(here);
    return [answer, { components: components.filter((c) => JSON.stringify(c.usage?.tree?.path) === key).map((c) => c.name) }];
  })),
});

const entryOf = (c) => ({
  name: c.name,
  tier: c.tier,
  source: c.file,
  imports: c.imports,
  usage: Boolean(c.usage),
  ...(c.usage ? { ...c.usage, props: c.props, tokens: c.tokens, gallery: c.gallery, parts: c.parts } : {}),
});

const renderRegistry = (model) => `${JSON.stringify({
  package: model.packageName,
  entryPoints: model.specifiers,
  tree: treeWithComponents(model.tree, [], model.components),
  components: model.components.map(entryOf),
}, null, 2)}\n`;

export { renderRegistry };
