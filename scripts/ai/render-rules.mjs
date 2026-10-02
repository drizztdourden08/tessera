/* @layer tooling-scripts @kind logic */
import { ALWAYS_RULES } from './always-rules.constants.mjs';

const renderRules = (model) => {
  const rules = ALWAYS_RULES.map((rule, index) => `## ${index + 1}. ${rule.title}\n\n${rule.text}\n`);
  const entryPoints = model.specifiers.map((spec) => `- \`${spec}\``).join('\n');
  return [
    '# Rules for every Tessera screen\n',
    'These rules hold on every screen and for every component. A component page adds its own rules on top of them.\n',
    ...rules,
    `${entryPoints}\n`,
  ].join('\n');
};

export { renderRules };
