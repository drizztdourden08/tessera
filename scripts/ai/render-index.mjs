/* @layer tooling-scripts @kind logic */
import { APP_TIER_ORDER, TIER_ORDER } from './ai.constants.mjs';
import { capital } from './capital.mjs';
import { pageLink } from './page-link.mjs';
import { sentence } from './sentence.mjs';

const whereFrom = (component, app) => {
  if (component.imports.length > 0) return `Import from \`${component.imports[0]}\`.`;
  return app ? `Its folder is \`${component.folder}\`.` : 'Not exported; Tessera uses it inside.';
};

const line = (component, app) => {
  if (!component.page) return `- ${pageLink(component, 'components/')}: usage not written yet. ${whereFrom(component, app)}`;
  const block = component.usage.buildingBlock === true ? ' A building block.' : '';
  return `- ${pageLink(component, 'components/')}: ${sentence(component.usage.job)}${block} ${whereFrom(component, app)}`;
};

const tiersOf = (components, order) => [...new Set([...order, ...components.map((c) => c.tier)])]
  .filter((tier) => components.some((c) => c.tier === tier));

const heading = (model, written) => (model.app
  ? [`# ${model.app.name} parts\n`, `One line per part of this app. ${written} of ${model.components.length} have their usage written; a linked name opens its page. The Tessera parts are in [Tessera's index](${model.app.tesseraAi}/index.md).\n`]
  : ['# Tessera components\n', `One line per component. ${written} of ${model.components.length} have their usage written; a linked name opens its page.\n`]);

const renderIndex = (model) => {
  const written = model.components.filter((c) => c.page).length;
  const sections = tiersOf(model.components, model.app ? APP_TIER_ORDER : TIER_ORDER).flatMap((tier) => [
    `## ${capital(tier)}\n`,
    `${model.components.filter((c) => c.tier === tier).map((c) => line(c, Boolean(model.app))).join('\n')}\n`,
  ]);
  return [...heading(model, written), ...sections].join('\n');
};

export { renderIndex };
