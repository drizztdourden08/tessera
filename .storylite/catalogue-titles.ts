/* @layer root-config @kind logic */
import { CATALOGUE } from './catalogue.constants';

const catalogueTitles = (): string[] =>
  CATALOGUE.flatMap((tier) => tier.groups.flatMap((group) => {
    const folder = group.group ? `${tier.tier} · ${group.group}` : tier.tier;
    return group.entries.map((entry) => `${folder}/${entry.name}`);
  }));

export { catalogueTitles };
