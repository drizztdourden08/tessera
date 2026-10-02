/* @layer root-config @kind logic */
import { folderFor } from './catalogue-folder';
import { CATALOGUE } from './catalogue.constants';
import type { MenuOrder } from './menu.type';

const menuOrder = (): MenuOrder =>
  CATALOGUE.flatMap((t) => t.groups.flatMap((g) => [
    folderFor(t.tier, g.group),
    g.entries.flatMap((e): MenuOrder => [e.name, ['Overview', 'Playground']]),
  ]));

export { menuOrder };
