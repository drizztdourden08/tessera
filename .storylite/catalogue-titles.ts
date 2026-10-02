/* @layer root-config @kind logic */
import { folderFor } from './catalogue-folder';
import { CATALOGUE } from './catalogue.constants';

const catalogueTitles = (): string[] =>
  CATALOGUE.flatMap((tier) => tier.groups.flatMap((group) => {
    const folder = folderFor(tier.tier, group.group);
    return group.entries.map((entry) => `${folder}/${entry.name}`);
  }));

export { catalogueTitles };
