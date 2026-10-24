/* @layer tooling-scripts @kind logic */
import { sentence } from './sentence.mjs';
import { usageSections } from './usage-sections.mjs';

const code = (text) => `\`${text}\``;

const valuesOf = (m) => m.exports.filter((entry) => entry.kind !== 'type');

const importLines = (m) => {
  if (m.imports.length === 0) return ['Tessera does not export this module.\n'];
  const others = m.imports.length > 1 ? ` It is also exported from ${m.imports.slice(1).map(code).join(', ')}.` : '';
  return [`Import from ${code(m.imports[0])}.${others}\n`, '```tsx', `import { ${valuesOf(m).map((entry) => entry.name).join(', ')} } from '${m.imports[0]}';`, '```\n'];
};

const exportLines = (m) => {
  const types = m.exports.filter((entry) => entry.kind === 'type');
  return [
    '## What it exports\n',
    `${valuesOf(m).map((entry) => `- ${code(entry.name)}, a ${entry.kind}: ${code(entry.text)}.`).join('\n')}\n`,
    ...(types.length > 0 ? ['## Types\n', '```ts', types.map((entry) => entry.text).join('\n\n'), '```\n'] : []),
  ];
};

const renderModule = (model, m) => {
  const byName = new Map([...(model.links ?? []), ...model.components].map((entry) => [entry.name, entry]));
  return [
    `# ${m.name}\n`,
    `${sentence(m.usage.job)}\n`,
    'A hook module: functions for a screen that owns its own markup, not a component.\n',
    ...importLines(m),
    `The source is ${code(m.file)}.\n`,
    ...usageSections(m.usage, byName),
    ...exportLines(m),
  ].join('\n');
};

export { renderModule };
