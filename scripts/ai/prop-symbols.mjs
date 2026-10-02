/* @layer tooling-scripts @kind logic */
import ts from 'typescript';

const isOptional = (prop) => Boolean(prop.flags & ts.SymbolFlags.Optional);

const isEmpty = (checker, prop) => Boolean(checker.getTypeOfSymbol(prop).flags & (ts.TypeFlags.Never | ts.TypeFlags.Undefined));

const memberOnly = (checker, members, shared) => {
  const found = new Map();
  for (const member of members) {
    for (const prop of checker.getPropertiesOfType(member)) {
      if (!shared.has(prop.name) && !found.has(prop.name) && !isEmpty(checker, prop)) found.set(prop.name, { prop, optional: true });
    }
  }
  return [...found.values()];
};

const propSymbols = (checker, type) => {
  if (!type) return [];
  const common = checker.getPropertiesOfType(type).map((prop) => ({ prop, optional: isOptional(prop) }));
  if (!type.isUnion()) return common;
  return [...common, ...memberOnly(checker, type.types, new Set(common.map(({ prop }) => prop.name)))];
};

export { propSymbols };
