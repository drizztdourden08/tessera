/* @layer tooling-scripts @kind logic */
import { catalogueTier } from './catalogue-tier.mjs';
import { insertInList } from './insert-in-list.mjs';
import { quoteText } from './quote-text.mjs';

const addCatalogueEntry = (text, group, entry) => {
  const found = catalogueTier(text).groups.find((g) => g.name === group);
  if (!found) return undefined;
  const open = text.indexOf('[', text.indexOf('entries:', found.index));
  return insertInList(text, open, `{ name: ${quoteText(entry.name)}, summary: ${quoteText(entry.summary)} }`);
};

export { addCatalogueEntry };
