/* @layer tooling-scripts @kind logic */
import { askChoice } from './ask-choice.mjs';
import { catalogueTier } from './catalogue-tier.mjs';
import { CATALOGUE_FILES } from './new.constants.mjs';
import { readText } from './read-text.mjs';

const pickGroup = async (io, { root, kind, group }) => {
  const file = CATALOGUE_FILES[kind];
  const { tier, groups } = catalogueTier(readText(root, file).text);
  const names = groups.map((g) => g.name).filter(Boolean);
  if (group !== undefined) {
    const found = names.find((name) => name.toLowerCase() === group.toLowerCase());
    return found ? { tier, group: found } : { problem: `${file} has no group "${group}". Its groups: ${names.join(', ')}` };
  }
  if (!io.interactive) return { problem: `pass --group with one of the ${tier} groups: ${names.join(', ')}` };
  return { tier, group: await askChoice(io, { question: `Which ${tier} group does its gallery page go under?`, options: names }) };
};

export { pickGroup };
