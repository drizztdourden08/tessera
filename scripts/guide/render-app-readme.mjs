/* @layer tooling-scripts @kind logic */
const renderAppReadme = (model) => {
  const { name, tesseraGuide } = model.app;
  const written = model.components.filter((c) => c.page).length;
  return [
    `# ${name} usage guide\n`,
    `This folder tells a reader, a person or an assistant, which part of ${name} fits a case and how to use it. \`tessera guide\` builds it from the usage file beside each part and from the code itself, so edit those, not this folder.\n`,
    `${name} is built on Tessera. Read the Tessera guide first:\n`,
    [
      `1. [rules.md](${tesseraGuide}/rules.md): the rules that hold on every screen.`,
      `2. [decide.md](${tesseraGuide}/decide.md): questions that lead to the Tessera component for a case.`,
      `3. [index.md](${tesseraGuide}/index.md): every Tessera component on one line.`,
    ].join('\n'),
    '',
    'Then read the parts of this app:\n',
    [
      '1. [decide.md](decide.md): the answers this app adds to the decision tree, and the app parts at each answer.',
      '2. [index.md](index.md): every app part on one line.',
      '3. `components/<Name>.md`: one page per app part, with its rules, an example and its props.',
      '4. [registry.json](registry.json): the same facts as data.',
    ].join('\n'),
    '',
    `${written} of ${model.components.length} parts have their usage written. A part without one is listed in the index with its folder only.\n`,
  ].join('\n');
};

export { renderAppReadme };
