/* @layer tooling-scripts @kind logic */
import ts from 'typescript';

const isFunction = (node) => ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node);

const functionOf = (node) => {
  if (!node) return undefined;
  if (isFunction(node)) return node;
  if (ts.isVariableDeclaration(node)) return functionOf(node.initializer);
  if (ts.isCallExpression(node)) return node.arguments.map(functionOf).find(Boolean);
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return functionOf(node.expression);
  return undefined;
};

const destructuredFrom = (fn, propsName) => {
  if (!fn.body || !ts.isBlock(fn.body)) return undefined;
  for (const statement of fn.body.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const found = statement.declarationList.declarations.find((d) =>
      ts.isObjectBindingPattern(d.name) && d.initializer && ts.isIdentifier(d.initializer) && d.initializer.text === propsName);
    if (found) return found.name;
  }
  return undefined;
};

const bindingOf = (fn) => {
  const param = fn.parameters[0];
  if (!param) return undefined;
  if (ts.isObjectBindingPattern(param.name)) return param.name;
  return ts.isIdentifier(param.name) ? destructuredFrom(fn, param.name.text) : undefined;
};

const propDefaults = (symbol) => {
  const fn = functionOf(symbol.valueDeclaration);
  const binding = fn && bindingOf(fn);
  if (!binding) return {};
  return Object.fromEntries(binding.elements
    .filter((element) => element.initializer && !element.dotDotDotToken)
    .map((element) => [(element.propertyName ?? element.name).getText(), element.initializer.getText().replace(/\s+/g, ' ')]));
};

export { propDefaults };
