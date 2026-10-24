/* @layer tooling-scripts @kind logic */
import { pageLink } from './page-link.mjs';
import { sentence } from './sentence.mjs';

const list = (title, lines) => [`## ${title}\n`, `${lines.map((text) => `- ${sentence(text)}`).join('\n')}\n`];

const avoidLines = (usage, byName) =>
  list('Use something else when', usage.avoidWhen.map((entry) => `${sentence(entry.case)} Use ${pageLink(byName.get(entry.use) ?? { name: entry.use }, '')} instead`));

const usageSections = (usage, byName) => [
  ...list('Use it when', usage.useWhen),
  ...avoidLines(usage, byName),
  ...list('Rules', usage.rules),
  ...list('Accessibility', usage.a11y),
  '## Example\n',
  '```tsx',
  usage.example.trim(),
  '```\n',
];

export { usageSections };
