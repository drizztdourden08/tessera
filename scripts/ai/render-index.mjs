/* @layer tooling-scripts @kind logic */
import { TIER_ORDER } from './ai.constants.mjs';
import { capital } from './capital.mjs';
import { pageLink } from './page-link.mjs';
import { sentence } from './sentence.mjs';

const whereFrom = (component) =>
  (component.imports.length > 0 ? `Import from \`${component.imports[0]}\`.` : 'Not exported; Tessera uses it inside.');

const line = (component) => {
  if (!component.page) return `- ${pageLink(component, 'components/')}: usage not written yet. ${whereFrom(component)}`;
  const block = component.usage.buildingBlock === true ? ' A building block.' : '';
  return `- ${pageLink(component, 'components/')}: ${sentence(component.usage.job)}${block} ${whereFrom(component)}`;
};

const tiersOf = (components) => [...new Set([...TIER_ORDER, ...components.map((c) => c.tier)])]
  .filter((tier) => components.some((c) => c.tier === tier));

const renderIndex = (model) => {
  const written = model.components.filter((c) => c.page).length;
  const sections = tiersOf(model.components).flatMap((tier) => [
    `## ${capital(tier)}\n`,
    `${model.components.filter((c) => c.tier === tier).map(line).join('\n')}\n`,
  ]);
  return [
    '# Tessera components\n',
    `One line per component. ${written} of ${model.components.length} have their usage written; a linked name opens its page.\n`,
    ...sections,
  ].join('\n');
};

export { renderIndex };
