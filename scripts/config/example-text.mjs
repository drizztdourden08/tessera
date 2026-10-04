/* @layer tooling-scripts @kind logic */
const isExampleText = (ts, node) => ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === 'example'
  && (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer));

const exampleText = (ts, source) => {
  let found;
  const visit = (node) => {
    if (found !== undefined) return;
    if (isExampleText(ts, node)) found = node.initializer.text;
    else ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
};

export { exampleText };
