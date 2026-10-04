/* @layer tooling-scripts @kind logic */
const ALIAS = '__usageExample';

const namedParts = (ts, bindings, next) => (bindings && ts.isNamedImports(bindings)
  ? bindings.elements.map((element) => `${element.isTypeOnly ? 'type ' : ''}${(element.propertyName ?? element.name).text} as ${next()}`)
  : []);

const importReexport = (ts, statement, next) => {
  const from = `'${statement.moduleSpecifier.text}'`;
  const clause = statement.importClause;
  if (!clause) return [`import ${from};`];
  const bindings = clause.namedBindings;
  const names = [...(clause.name ? [`default as ${next()}`] : []), ...namedParts(ts, bindings, next)];
  const star = bindings && ts.isNamespaceImport(bindings) ? [`export * as ${next()} from ${from};`] : [];
  const kind = clause.isTypeOnly ? 'export type' : 'export';
  return [...(names.length > 0 ? [`${kind} { ${names.join(', ')} } from ${from};`] : []), ...star];
};

export { ALIAS, importReexport };
