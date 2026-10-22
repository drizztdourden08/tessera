/* @layer tooling-scripts @kind logic */
import { askChoice } from './ask-choice.mjs';
import { catalogueTier } from './catalogue-tier.mjs';
import { CATALOGUE_FILES } from './new.constants.mjs';
import { readText } from './read-text.mjs';

const pickGroup = async (io, { root, kind, group }) => {
  const files = CATALOGUE_FILES[kind];
  const parsed = files.map((file) => ({ file, ...catalogueTier(readText(root, file).text) }));
  const tier = parsed.find((entry) => entry.tier !== undefined)?.tier;
  const listed = parsed.flatMap((entry) => entry.groups.filter((g) => g.name).map((g) => ({ name: g.name, file: entry.file })));
  const names = listed.map((entry) => entry.name);
  const locate = (name) => ({ tier, group: name, catalogueFile: listed.find((entry) => entry.name === name)?.file });
  if (group !== undefined) {
    const found = names.find((name) => name.toLowerCase() === group.toLowerCase());
    return found ? locate(found) : { problem: `${files.join(' or ')} has no group "${group}". Its groups: ${names.join(', ')}` };
  }
  if (!io.interactive) return { problem: `pass --group with one of the ${tier} groups: ${names.join(', ')}` };
  return locate(await askChoice(io, { question: `Which ${tier} group does its gallery page go under?`, options: names }));
};

export { pickGroup };
