/* @layer renderer-components @kind logic */
import type { MenuGroup, MenuNode } from '../../DropdownMenu';
import { tidyGroups } from '../../DropdownMenu/behavior/tidy-groups';

const dropdownNodes = (groups: readonly MenuGroup[]): MenuNode[] =>
  tidyGroups(groups).flatMap((group, index) => (index === 0 ? [...group.items] : [{ separator: true } as const, ...group.items]));

export { dropdownNodes };
