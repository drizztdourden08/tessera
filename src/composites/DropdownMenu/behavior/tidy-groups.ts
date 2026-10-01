/* @layer renderer-components @kind util */
import { tidyNodes } from './tidy-nodes';
import type { MenuGroup } from '../DropdownMenu.type';

const tidyGroups = (groups: readonly MenuGroup[]): MenuGroup[] =>
  groups.map((group) => ({ ...group, items: tidyNodes(group.items) })).filter((group) => group.items.length > 0);

export { tidyGroups };
