/* @layer root-config @kind logic */
import { CATALOGUE } from './catalogue.constants';
import type { MenuOrder } from './menu.type';

const folderFor = (tier: string, group: string): string => (group ? `${tier} · ${group}` : tier);

const menuOrder = (): MenuOrder =>
  CATALOGUE.flatMap((t) => t.groups.flatMap((g) => [
    folderFor(t.tier, g.group),
    g.entries.flatMap((e): MenuOrder => [e.name, ['Overview', 'Playground']]),
  ]));

export { menuOrder };
