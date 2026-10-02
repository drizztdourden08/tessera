/* @layer tooling-scripts @kind logic */
import ts from 'typescript';

const componentSymbol = ({ program, checker }, root, component) => {
  const source = program.getSourceFile(`${root}/${component.file}`);
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  const symbol = moduleSymbol && checker.getExportsOfModule(moduleSymbol).find((s) => s.name === component.name);
  if (!symbol) return undefined;
  return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
};

export { componentSymbol };
