/* @layer tooling-scripts @kind logic */
import ts from 'typescript';
import { propDefaults } from './prop-defaults.mjs';
import { propSymbols } from './prop-symbols.mjs';
import { propTypeText } from './prop-type-text.mjs';

const isLibrary = (declaration) => declaration.getSourceFile().fileName.includes('/node_modules/');

const propsTypeOf = (checker, symbol) => {
  const type = checker.getTypeOfSymbol(symbol);
  const signature = type.getCallSignatures()[0] ?? type.getConstructSignatures()[0];
  const param = signature?.parameters[0];
  return param ? checker.getTypeOfSymbol(param) : undefined;
};

const parentName = (declaration) => {
  const parent = declaration.parent;
  return parent && (ts.isInterfaceDeclaration(parent) || ts.isTypeAliasDeclaration(parent)) ? parent.name.text : undefined;
};

const heritageOf = (parents) => {
  const names = new Set(parents.map((parent) => parent.name.text));
  const clauses = parents.flatMap((parent) => (parent.heritageClauses ?? []).flatMap((clause) => clause.types));
  const kept = clauses.filter((type) => !names.has(type.expression.getText()));
  return [...new Set(kept.map((type) => type.getText().replace(/\s+/g, ' ')))];
};

const ownProp = (checker, { prop, optional }, declaration, defaults) => ({
  name: prop.name,
  optional,
  ...propTypeText(checker, prop, declaration),
  default: defaults[prop.name],
});

const readProps = (checker, symbol) => {
  const type = propsTypeOf(checker, symbol);
  const defaults = propDefaults(symbol);
  const own = [];
  const inherited = new Set();
  const parents = new Set();
  let inheritedCount = 0;
  for (const entry of propSymbols(checker, type)) {
    const { prop } = entry;
    const declaration = prop.declarations?.find((d) => !isLibrary(d));
    if (declaration) {
      own.push(ownProp(checker, entry, declaration, defaults));
      if (ts.isInterfaceDeclaration(declaration.parent)) parents.add(declaration.parent);
      continue;
    }
    inheritedCount += 1;
    for (const name of (prop.declarations ?? []).map(parentName).filter(Boolean)) inherited.add(name);
  }
  return { own, inherited: { count: inheritedCount, from: [...inherited].sort(), extends: heritageOf([...parents]) } };
};

export { readProps };
