/* @layer tooling-scripts @kind logic */
const renderReadme = (model) => {
  const written = model.components.filter((c) => c.page).length;
  return [
    '# Tessera for AI readers\n',
    `This folder tells an AI which \`${model.packageName}\` component fits a case and how to use it. \`pnpm ai\` builds it from the usage file beside each component and from the code itself, so edit those, not this folder.\n`,
    'Read in this order:\n',
    [
      '1. [rules.md](rules.md): the rules that hold on every screen.',
      '2. [decide.md](decide.md): questions that lead from what you are placing to the component for it.',
      '3. [index.md](index.md): every component on one line, with where to import it from.',
      '4. `components/<Name>.md`: one page per component, with its rules, an example and its props.',
      '5. [registry.json](registry.json): the same facts as data.',
    ].join('\n'),
    '',
    `${written} of ${model.components.length} components have their usage written. A component without one is listed in the index with its import path only.\n`,
  ].join('\n');
};

export { renderReadme };
