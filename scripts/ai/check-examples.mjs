/* @layer tooling-scripts @kind logic */
import ts from 'typescript';

const finding = (name, message) => ({ kind: 'example', name, message, coverage: false });

const diagnosticText = (diagnostic) => {
  const text = ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ');
  if (!diagnostic.file || diagnostic.start === undefined) return text;
  const { line } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  return `line ${line + 1}: ${text}`;
};

const importProblems = (source, { packageName, specifiers, relative }) =>
  source.statements
    .filter((statement) => ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier))
    .map((statement) => statement.moduleSpecifier.text)
    .filter((spec) => (spec.startsWith('.') && !relative) || (spec.startsWith(packageName) && !specifiers.has(spec)))
    .map((spec) => `imports ${spec}; import from the package root or a public subpath`);

const checkExamples = ({ program, exampleFiles }, imports) =>
  [...exampleFiles].flatMap(([name, file]) => {
    const source = program.getSourceFile(file);
    if (!source) return [finding(name, 'the example could not be read')];
    const diagnostics = [...program.getSyntacticDiagnostics(source), ...program.getSemanticDiagnostics(source)];
    return [...importProblems(source, imports), ...diagnostics.map(diagnosticText)].map((message) => finding(name, message));
  });

export { checkExamples };
