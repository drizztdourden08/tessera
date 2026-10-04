/* @layer renderer-components @kind logic */
import type { MenuGroup, MenuNode } from '../../DropdownMenu';

const flatGroup = (group: MenuGroup): MenuGroup[] => {
  const out: MenuGroup[] = [];
  let plain: MenuNode[] = [];
  const flush = (): void => {
    if (plain.length > 0) out.push({ id: `${group.id}:${out.length}`, label: out.length === 0 ? group.label : undefined, items: plain });
    plain = [];
  };
  for (const node of group.items) {
    if ('children' in node && node.children) {
      flush();
      out.push({ id: node.id, label: node.label, items: node.children });
    } else {
      plain.push(node);
    }
  }
  flush();
  return out;
};

const flatMenu = (groups: readonly MenuGroup[]): MenuGroup[] => groups.flatMap(flatGroup);

export { flatMenu };
