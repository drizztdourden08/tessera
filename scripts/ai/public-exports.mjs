/* @layer tooling-scripts @kind logic */
import ts from 'typescript';
import { codeEntries } from './code-entries.mjs';
import { specifierOf } from './specifier-of.mjs';

const declarationFile = (checker, symbol, root) => {
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration = target.declarations?.[0];
  return { target, file: declaration ? declaration.getSourceFile().fileName.slice(root.length + 1) : undefined };
};

const publicExports = ({ program, checker }, root, manifest) => {
  const byName = new Map();
  for (const [key, target] of codeEntries(manifest)) {
    const source = program.getSourceFile(`${root}/${target.slice(2)}`);
    const moduleSymbol = source && checker.getSymbolAtLocation(source);
    if (!moduleSymbol) continue;
    for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
      const { target: resolved, file } = declarationFile(checker, symbol, root);
      if (!(resolved.flags & ts.SymbolFlags.Value)) continue;
      const entry = byName.get(symbol.name) ?? { name: symbol.name, file, specifiers: [] };
      entry.specifiers.push(specifierOf(manifest.name, key));
      byName.set(symbol.name, entry);
    }
  }
  return byName;
};

export { publicExports };
