/* @layer tooling-scripts @kind logic */
import { pageLink } from './page-link.mjs';
import { renderProps } from './render-props.mjs';
import { sentence } from './sentence.mjs';

const code = (text) => `\`${text}\``;

const NOT_EXPORTED = {
  tessera: 'Tessera does not export it; it is used inside other components.\n',
  app: 'Import it by its path from the folder of the part that uses it.\n',
};

const list = (title, lines) => [`## ${title}\n`, `${lines.map((text) => `- ${sentence(text)}`).join('\n')}\n`];

const importLines = (c, voice) => {
  if (c.imports.length === 0) return [NOT_EXPORTED[voice]];
  const others = c.imports.length > 1 ? ` It is also exported from ${c.imports.slice(1).map(code).join(', ')}.` : '';
  return [`Import it from ${code(c.imports[0])}.${others}\n`, '```tsx', `import { ${c.name} } from '${c.imports[0]}';`, '```\n'];
};

const galleryLine = (c, voice) => {
  const source = `The source is ${code(c.file)}.`;
  if (voice === 'app') return `${source}\n`;
  if (!c.gallery) return `${source} It has no gallery page yet.\n`;
  return `${source} Its gallery page is ${c.gallery.title} (${code(c.gallery.route)}).\n`;
};

const treeLines = (tree, questions) => {
  if (!tree) return ['## A building block\n', 'No question in [decide.md](../decide.md) leads here. Other components are built on it.\n'];
  const steps = tree.path.map((answer, at) => `${questions[at]} ${sentence(answer)}`);
  return ['## Where the questions lead here\n', `${steps.join(' ')}\n`, `${sentence(tree.rule)}\n`];
};

const avoidLines = (c, byName) =>
  list('Use something else when', c.usage.avoidWhen.map((entry) => `${sentence(entry.case)} Use ${pageLink(byName.get(entry.use) ?? { name: entry.use }, '')} instead`));

const questionsOn = (tree, path) => {
  const questions = [];
  let node = tree;
  for (const answer of path) {
    questions.push(node?.question);
    node = node?.answers[answer];
  }
  return questions;
};

const tailLines = (c) => [
  ...(c.tokens.length > 0 ? ['## Tokens\n', `It draws on ${c.tokens.map(code).join(', ')}.\n`] : []),
  ...(c.parts.length > 0 ? ['## Also exported from this folder\n', `${c.parts.map(code).join(', ')}.\n`] : []),
];

const renderComponent = (model, c) => {
  const byName = new Map([...(model.links ?? []), ...model.components].map((entry) => [entry.name, entry]));
  const voice = model.app ? 'app' : 'tessera';
  const { usage } = c;
  return [
    `# ${c.name}\n`,
    `${sentence(usage.job)}\n`,
    ...importLines(c, voice),
    galleryLine(c, voice),
    ...treeLines(usage.tree, questionsOn(model.tree, usage.tree?.path ?? [])),
    ...list('Use it when', usage.useWhen),
    ...avoidLines(c, byName),
    ...list('Rules', usage.rules),
    ...list('Accessibility', usage.a11y),
    '## Example\n',
    '```tsx',
    usage.example.trim(),
    '```\n',
    ...renderProps(c.props),
    ...tailLines(c),
  ].join('\n');
};

export { renderComponent };
