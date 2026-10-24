/* @layer tooling-scripts @kind logic */
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { isHookName } from './is-hook-name.mjs';
import { missingFields } from './missing-fields.mjs';

const kindOf = (name) => {
  if (isHookName(name)) return 'hook';
  return name === name.toUpperCase() ? 'constant' : 'function';
};

const tidy = (text) => text.replace(/\r\n/g, '\n');

const exportOf = ({ checker }, symbol) => {
  const resolved = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  if (resolved.flags & ts.SymbolFlags.Value) {
    const text = checker.typeToString(checker.getTypeOfSymbol(resolved), undefined, ts.TypeFormatFlags.NoTruncation);
    return { name: symbol.name, kind: kindOf(symbol.name), text };
  }
  return { name: symbol.name, kind: 'type', text: tidy(resolved.declarations?.[0]?.getText() ?? '') };
};

const exportsOf = (program, root, module) => {
  const source = program.program.getSourceFile(`${root}/${module.file}`);
  const moduleSymbol = source && program.checker.getSymbolAtLocation(source);
  const symbols = moduleSymbol ? program.checker.getExportsOfModule(moduleSymbol) : [];
  return symbols.map((symbol) => exportOf(program, symbol)).sort((a, b) => a.name.localeCompare(b.name));
};

const hashOf = (exports) => createHash('sha1').update(JSON.stringify(exports.map(({ name, kind, text }) => [name, kind, text]))).digest('hex').slice(0, 16);

const moduleFacts = ({ program, root, exports: published }, module) => {
  const listed = program ? exportsOf(program, root, module) : [];
  const first = listed.find((entry) => entry.kind !== 'type');
  return {
    ...module,
    page: Boolean(module.usage) && missingFields(module.usage, { hooks: true }).length === 0,
    imports: published.get(first?.name)?.specifiers ?? [],
    exports: listed,
    ...(module.usage && program ? { propsHash: hashOf(listed) } : {}),
  };
};

export { moduleFacts };
