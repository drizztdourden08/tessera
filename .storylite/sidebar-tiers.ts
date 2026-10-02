/* @layer root-config @kind logic */
import { folderFor } from './catalogue-folder';
import { CATALOGUE } from './catalogue.constants';
import { lucideBody } from './lucide-body';
import { TIER_ICONS } from './sidebar-icons.constants';

const sidebarTiers = (root: string) => {
  const folders = Object.fromEntries(CATALOGUE.flatMap((tier) =>
    tier.groups.map((group) => [folderFor(tier.tier, group.group), [tier.tier, group.group]])));
  const icons = Object.fromEntries(Object.entries(TIER_ICONS).map(([tier, icon]) => [tier, lucideBody(root, icon)]));
  return { folders, icons, open: lucideBody(root, 'chevron-down'), closed: lucideBody(root, 'chevron-right') };
};

export { sidebarTiers };
