/* @layer tooling-scripts @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const PAGE_CALLS = new Set(['overviewStory', 'textElementStories', 'scaleStories', 'guideStories']);

const storyFiles = (stories) => fs.readdirSync(stories, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((dir) => fs.readdirSync(path.join(stories, dir.name)).filter((file) => file.endsWith('.stories.tsx')).map((file) => `${dir.name}/${file}`));

const topConstants = (source) => new Map(source.statements.filter(ts.isVariableStatement)
  .flatMap((statement) => statement.declarationList.declarations)
  .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.initializer)
  .map((declaration) => [declaration.name.text, declaration.initializer]));

const parse = (file) => ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

const resolveModule = (from, specifier) => ['.ts', '.tsx'].map((ext) => path.resolve(path.dirname(from), specifier + ext)).find((file) => fs.existsSync(file));

const isLocalConstants = (statement) => ts.isImportDeclaration(statement) && /^\..*\.constants$/.test(statement.moduleSpecifier.text);

const moduleConstants = (file, source = parse(file), seen = new Set([file])) => {
  const imported = source.statements.filter(isLocalConstants)
    .map((statement) => resolveModule(file, statement.moduleSpecifier.text)).filter((other) => other && !seen.has(other))
    .flatMap((other) => [...moduleConstants(other, parse(other), seen.add(other))]);
  return new Map([...imported, ...topConstants(source)]);
};

const unwrap = (node) => (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) ? unwrap(node.expression) : node);

const propertiesOf = (object) => new Map(object.properties
  .filter((property) => ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property))
  .map((property) => [property.name.text, ts.isShorthandPropertyAssignment(property) ? property.name : property.initializer]));

const memberOf = (node, constants) => {
  const object = ts.isIdentifier(node.expression) ? unwrap(constants.get(node.expression.text)) : undefined;
  return object && ts.isObjectLiteralExpression(object) ? propertiesOf(object).get(node.name.text) : undefined;
};

const templateOf = (node, constants) => {
  const parts = [node.head.text, ...node.templateSpans.flatMap((span) => [stringOf(span.expression, constants), span.literal.text])];
  return parts.every((part) => typeof part === 'string') ? parts.join('') : null;
};

const stringOf = (raw, constants) => {
  const node = unwrap(raw);
  if (node === undefined) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return templateOf(node, constants);
  if (ts.isPropertyAccessExpression(node)) return stringOf(memberOf(node, constants), constants) ?? null;
  if (ts.isIdentifier(node) && constants.has(node.text)) return stringOf(constants.get(node.text), constants);
  return null;
};

const listOf = (raw, constants) => {
  const node = unwrap(raw);
  if (node === undefined) return [];
  if (ts.isIdentifier(node) && constants.has(node.text)) return listOf(constants.get(node.text), constants);
  if (!ts.isArrayLiteralExpression(node)) return null;
  return node.elements.map((element) => stringOf(element, constants));
};

const pageArgument = (node, constants) => {
  if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || !PAGE_CALLS.has(node.expression.text)) return undefined;
  const argument = unwrap(ts.isIdentifier(node.arguments[0] ?? node) ? constants.get(node.arguments[0].text) : node.arguments[0]);
  return argument && ts.isObjectLiteralExpression(argument) ? argument : undefined;
};

const pageCalls = (source, constants) => {
  const calls = [];
  const visit = (node) => {
    const argument = pageArgument(node, constants);
    if (argument) calls.push(argument);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return calls;
};

const readStoryPages = (stories, file) => {
  const full = path.join(stories, file);
  const source = parse(full);
  const constants = moduleConstants(full, source);
  return pageCalls(source, constants).map((call) => {
    const props = propertiesOf(call);
    return {
      file,
      name: stringOf(props.get('component') ?? props.get('name'), constants) ?? path.basename(file, '.stories.tsx'),
      lead: stringOf(props.get('description'), constants),
      points: listOf(props.get('points'), constants),
      instead: stringOf(props.get('instead'), constants),
    };
  });
};

export { readStoryPages, storyFiles };
